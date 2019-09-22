<?php

class UsersController extends ControllerBase
{

    /**
     * Gets index of users.
     */
    public function index()
    {
        /**
         * Locals
         */
        $index = null;

        /**
         * Externals
         */
        $userID = $this->currentUserId();

        /**
         * Checking access
         */
        $allowed = $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Granting access
         */
        if ($allowed) {
            $index = User::find(["columns" => "login"]);
        }

        /**
         * Building response
         */
        $this->response
            ->setContent(
                json_encode([
                    "success" => boolval($index),
                    "index" => json_encode($index),
                    "allowed" => $allowed,
                    "userId" => $userID
                ])
            )
            ->send();
    }

    /**
     * Gets full info about user by its id.
     * @param $issueID
     */
    public function item($itemID)
    {
        /**
         * Locals
         */
        $item = null;

        /**
         * Externals
         */
        $itemID = $this->filter->sanitize($itemID, "absint");


        /**
         * Checking access
         */

        $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Granting access
         */
        if ($allowed) {
            $item = User::findFirst($itemID);
        }

        /**
         * Building response
         */
        $this->response
            ->setContent(
                json_encode([
                    "success" => boolval($item),
                    "item" => $item
                ])
            )
            ->send();
    }

    public function register()
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Checking access
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        if ($allowed) {
            /**
             * Collecting request data
             */
            $email = $this->request->get("email", "email", "");
            $password = $this->request->get("password", "string", "qwerty");
            /**
             * Is user exists
             */
            $user = User::find(["login=:email:", "bind"=>["email"=>$email]]);

            $isUser = sizeof($user)>0;
            /**
             * If it is
             */
            if(!$isUser) {
                $user = new User();
                $user->login = $email;
                $user->password = $password;
                $user->roleId = AclHelper::roleId("CommonUser");
                $success = $user->create();
            } else {
                $success = $user;
            }
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success,
                "item" => $user,
                "allowed" => $allowed
            ])
        )
            ->send();
    }

    public function login()
    {

        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $login = $this->request->get("email", "email", "");
        $passwd = $this->request->get("password", "string", "");

        /**
         * Finding user
         */
        $user = User::findFirst([
            "login=:login: AND password=:password: AND roleId > :guestId:",
            "bind" => [
                "login" => $login,
                "password" => md5($passwd),
                "guestId" => AclHelper::roleId("Guest")
            ]
        ]);

        /**
         * Building response.
         */

        if ($this->dispatcher->wasForwarded()) {

            return [
                "success" => boolval($user),
                "item" => $user
            ];
        }

        $this->response->setContent(
            json_encode([
                "success" => boolval($user),
                "item" => $user
            ])
        )
            ->send();
    }

    public function delete()
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $login = $this->request->get("email", "email", "");
        $roleId = $this->request->get("roleId", "absint", 0);

        /**
         * Checking permissions
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Finding user
         */
        if ($allowed) {
            $user = User::findFirst([
                "login=:login: AND roleId=:roleId:",
                "bind" => [
                    "login" => $login,
                    "roleId" => $roleId
                ]
            ]);
            if ($user) {
                $user->roleId = AclHelper::roleId("Guest");
                $success = $user->update();
            }
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success,
                "item" => $user
            ])
        )
            ->send();
    }

    public function purge()
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $login = $this->request->get("email", "email", "");
        $roleId = $this->request->get("roleId", "absint", 0);

        /**
         * Checking permissions
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Finding user
         */
        if ($allowed) {
            $user = User::findFirst([
                "login=:login: AND roleId=:roleId:",
                "bind" => [
                    "login" => $login,
                    "roleId" => $roleId
                ]
            ]);
            if ($user) {
                $success = $user->delete();
            }
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success
            ])
        )
            ->send();

    }

}

