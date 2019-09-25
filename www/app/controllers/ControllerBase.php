<?php

use Phalcon\Mvc\Controller;

class ControllerBase extends Controller
{
    protected function isAllowed(string $name): bool
    {
        /**
         * Externals
         */
        $className = str_replace("Controller", '', get_class($this));
        $Acl = $this->getDI()->getAcl();

        /**
         * Cheking permission for role
         */
        return $Acl->isAllowed(AclHelper::currentUserRole($this->di), $className, $name);
    }

    protected function currentUserId()
    {
        return $this->getDI()->getRequest()->get("userId", "absint", 0);
    }

}
