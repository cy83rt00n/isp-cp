<?php

/**
 * Access control list
 */

use Phalcon\Acl;
use Phalcon\Acl\Adapter\Memory as AclList;

$Acl = new AclList();

$Acl->setDefaultAction(Acl::DENY);
$Acl->addRole(new Acl\Role("Administrator"));
$Acl->addRole(new Acl\Role("Engineer"));
$Acl->addRole(new Acl\Role("Manager"));
$Acl->addRole(new Acl\Role("User"));
$Acl->addRole(new Acl\Role("Guest"));

$Issues = new Acl\Resource("Issues");
$Acl->addResource($Issues, ["index", "item", "report", "resolve"]);

$Acl->allow("Guest", "Issues", "index");

$Acl->addInherit("Engineer", "Guest");
$Acl->allow("Engineer", "Issues", "item");
$Acl->allow("Engineer", "Issues", "report");

$Acl->addInherit("Manager", "Engineer");
$Acl->allow("Manager", "Issues", "resolve");


class AclHelper
{

    public static $roles = [
        990 => "Guest",
        991 => "Engineer",
        992 => "Manager",
        993 => "Manager"
    ];

}