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
        new Column("slug", [
            "type" => Column::TYPE_VARCHAR,
            "size" => 255,
            "notNull" => true
        ]),
        new Column("title", [
            "type" => Column::TYPE_VARCHAR,
            "size" => 255
        ]),
        new Column("parentId", [
            "type" => Column::TYPE_INTEGER,
            "size" => 10,
            "notNull" => true,
            "default" => 0
        ])
    ],
    'indexes' => [
        new Index("PRIMARY", ["id"])
    ]
];