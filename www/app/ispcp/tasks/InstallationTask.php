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
            "terms"
        ];
        foreach ($requiredTables as $tableName) {
            if (!$this->db->tableExists($tableName)) {
                echo "Creating table " . '"' . $tableName . '"' . PHP_EOL;
                $tableDef = APP_PATH . '/' . "tables" . '/' . $tableName . ".php";
                if (file_exists($tableDef)) {
                    echo "Including table description from " . $tableDef . PHP_EOL;
                    $definition = include($tableDef);
                    $created = $this->db->createTable($tableName, null, $definition);
                    if ($created) {
                        echo "Done!" . PHP_EOL;
                    } else {
                        echo "Tabel was not created!" . PHP_EOL;
                    }
                } else {
                    echo "Table description file not found!" . PHP_EOL;
                }
            }
        }
    }

}

