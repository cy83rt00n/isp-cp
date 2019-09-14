<?php

use Phalcon\Mvc\Controller;

class UsersController extends Controller
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

