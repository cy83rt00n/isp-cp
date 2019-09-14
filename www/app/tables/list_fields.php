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
        new Column("list_id", [
            "type" => Column::TYPE_INTEGER,
            "size" => 10,
            "notNull" => true
        ]),
        new Column("value", [
            "type" => Column::TYPE_VARCHAR,
            "size" => 255,
            "notNull" => false
        ])
    ],
    'indexes' => [
        new Index("PRIMARY", ["id"])
    ]
];