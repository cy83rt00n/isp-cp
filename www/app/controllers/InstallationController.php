<?php

use Phalcon\Db\Adapter\Pdo\Mysql;
use Phalcon\Db\Column;
use Phalcon\Db\Index;

class InstallationController extends \Phalcon\Mvc\Controller
{

    public function indexAction()
    {
//        try {
            $requiredTables = [
                "users", "issues", "lists"
            ];
            foreach ($requiredTables as $tableName) {
                if ($this->db->tableExists($tableName)) {
                    echo $tableName . " already exists";
                } else {
                    echo $tableName . " not exists";
                    $tableDef = APP_PATH . '/' . "tables" . '/' . $tableName . ".php";
                    if(file_exists($tableDef)) {
                        echo "Including file " . $tableDef;
                        $definition = include($tableDef);
                        $this->db->createTable($tableName, null, $definition);
                    }
                }
            }
//        } catch (Exception $exception) {
//            echo $exception->getMessage();
////            $this->getDI()->getConfig()->database["table"] = "";
////            $di = $this->getDI()->getConfig();
////            $conf = $this->di->get("config")->get("database")->toArray();
////            $conf["table"] = "";
////            $adapter = new Mysql($conf);
////            $adapter->query("create database " . $this->getDI()->getConfig()->database["table"]);
////            var_dump($di->database);
//        }
    }

}

