<?php

class IssuesController extends \Phalcon\Mvc\Controller
{

    public function index()
    {
        $index = Issue::find(["columns"=>"id,comment"]);
        $this->response->setContent(json_encode([
            "success" => boolval($index),
            "controller" => __CLASS__,
            "function" => __FUNCTION__,
            "index" => json_encode($index)
        ]));
        $this->response->send();
    }

    public function item($id)
    {
        $issue = Issue::findFirst($this->filter->sanitize($id,"absint"));

        $this->response->setContent(json_encode([
            "success" => boolval($issue),
            "controller" => __CLASS__,
            "function" => __FUNCTION__,
            "item" => $issue
        ]));
        $this->response->send();
    }

    public function report()
    {
        $issue = new Issue();
        $issues = Issue::find();
        $issue->report_date = time();
        $issue->resolve_date = 0;
        $issue->comment = "First or maybe not issue";
        $issue->reporter = 1;
        $issue->resolver = 0;
        $success = $issue->save();

        $this->response->setContent(json_encode([
            "success" => $success,
            "controller" => __CLASS__,
            "function" => __FUNCTION__,
            "item" => $issue
        ]));
        $this->response->send();
    }

}

