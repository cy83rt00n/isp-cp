<?php

use Phalcon\Cli\Task;

class InstallationTask extends Task
{

    public function mainAction(array $argv)
    {
        $requiredTables = [
            "users",
            "issues",
            "options",
            "addresses"
        ];
        foreach ($requiredTables as $tableName) {
            if (!$this->db->tableExists($tableName)) {
                echo "Creating table " . '"' . $tableName . '"' . PHP_EOL;
                $tableDef = APP_PATH . '/' . "tables" . '/' . $tableName . ".php";
                if (file_exists($tableDef)) {
                    echo "Including table description from " . $tableDef . PHP_EOL;
                    $definition = include($tableDef);
                    $this->db->createTable($tableName, null, $definition);
                } else {
                    echo "Table description file not found!" . PHP_EOL;
                }
            }
        }
    }

}

