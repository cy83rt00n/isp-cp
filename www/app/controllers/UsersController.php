<?php

class UsersController extends \Phalcon\Mvc\Controller
{

    public function indexAction()
    {
        $users = new Users();
        $users->id = 1;
        $users->login = "admin";
        $users->password = "admin";
        $users->save();
    }

}

