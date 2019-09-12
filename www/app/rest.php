<?php

use Phalcon\Mvc\Micro;

$app = new Micro();

$app->get(
    "/rest/issues/index",
    function () use ($app) {
        echo json_encode(["success"=>true, "method"=>"get", "index"=>[], "size"=>0 ]);
    }
);

$app->handle();