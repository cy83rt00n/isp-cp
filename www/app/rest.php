<?php

use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Micro;
use Phalcon\Mvc\Micro\Collection as MicroCollection;


define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', BASE_PATH . '/app');

$di = new FactoryDefault();

/**
 * Shared configuration service
 */
$di->setShared('config', function () {
    return include APP_PATH . "/config/config.php";
});

/**
 * Database connection is created based in the parameters defined in the configuration file
 */
$di->setShared('db', function () {
    $config = $this->getConfig();

    $class = 'Phalcon\Db\Adapter\Pdo\\' . $config->database->adapter;
    $params = [
        'host' => $config->database->host,
        'username' => $config->database->username,
        'password' => $config->database->password,
        'dbname' => $config->database->dbname,
        'charset' => $config->database->charset
    ];

    if ($config->database->adapter == 'Postgresql') {
        unset($params['charset']);
    }

    $connection = new $class($params);

    return $connection;
});

$config = $di->getConfig();

include "config/loader.php";

$app = new Micro();

$app->response->setHeader("Access-Control-Allow-Origin", "*");
$app->response->setContentType("application/json", "utf-8");

include "config/acl.php";
$di->setShared("acl", $Acl);

$issues = new MicroCollection();
$issues->setHandler("IssuesController", true);
$issues->setPrefix("/api");
$issues->get("/issues", "index");
$issues->get("/issues/{id}", "item");
$issues->get("/issues/report", "report");
$issues->get("/issues/resolve/{id}", "resolve");
$app->mount($issues);

$users = new MicroCollection();
$users->setHandler("UsersController", true);
$users->setPrefix("/api");
$users->get("/users", "index");
$users->get("/users/{id}", "item");
$users->get("/users/register", "register");
$users->get("/users/login", "login");
$users->get("/users/delete", "delete");
$users->get("/users/purge", "purge");
$app->mount($users);

$terms = new MicroCollection();
$terms->setHandler("TermsController", true);
$terms->setPrefix("/api");
$terms->get("/terms", "index");
$terms->get("/terms/{slug:[a-zA-Z0-9]+}", "index");
$terms->get("/terms/create", "create");
$terms->get("/terms/delete/{id:[0-9]}", "delete");
$app->mount($terms);

$app->notFound(function () {
    echo json_encode(["success" => false]);
});

$app->handle();