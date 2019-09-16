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
        new Column("report_date", [
            "type" => Column::TYPE_INTEGER,
            "size" => 10,
            "notNull" => true
        ]),
        new Column("resolve_date", [
            "type" => Column::TYPE_INTEGER,
            "size" => 10,
            "notNull" => true
        ]),
        new Column("comment", [
            "type" => Column::TYPE_TEXT
        ]),
        new Column("reporter", [
            "type" => Column::TYPE_INTEGER,
            "size" => 10,
        ]),
        new Column("resolver", [
            "type" => Column::TYPE_INTEGER,
            "size" => 10
        ])
    ],
    'indexes' => [
        new Index("PRIMARY", ["id"])
    ]
];