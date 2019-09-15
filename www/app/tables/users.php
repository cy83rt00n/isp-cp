<?php

use Phalcon\Db\Column;
use Phalcon\Db\Index;

return [
    'columns' => [
        new Column("id", [
            "type" => Column::TYPE_INTEGER,
            "size" => 10,
            "notNull" => true,
            "autoIncrement" => true
        ]),
        new Column("login", [
            "type" => Column::TYPE_VARCHAR,
            "size" => 255,
            "notNull" => true
        ]),
        new Column("password", [
            "type" => Column::TYPE_VARCHAR,
            "size" => 255,
            "notNull" => true
        ]),
        new Column("roleId", [
            "type" => Column::TYPE_INTEGER,
            "size" => 10,
            "notNull" => true
        ])
    ],
    'indexes' => [
        new Index("PRIMARY", ["id"])
    ]
];