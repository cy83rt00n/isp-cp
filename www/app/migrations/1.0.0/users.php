<?php

use Phalcon\Db\Column as Column;
use Phalcon\Db\Index as Index;
use Phalcon\Db\Reference as Reference;
use Phalcon\Mvc\Model\Migration;


class UsersMigration_100 extends Migration
{

    public function up()
    {
        $this->morphTable(

            [
                "columns" => [
                    new Column("id",
                        [
                            "type" => Column::TYPE_INTEGER,
                            "size" => 10,
                            "notNull" => true,
                            "autoIncrement" => true
                        ]
                    )
                ],
                'indexes' => [
                    new Index(
                        'PRIMARY',
                        [
                            'id',
                        ]
                    )
                ],
            ]
        );
    }

}