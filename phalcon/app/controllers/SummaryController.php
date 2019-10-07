<?php

class SummaryController extends ControllerBase
{
    function index($date = "now", $status = "closed")
    {
        /**
         * Locals
         */
        $allowed = true;
        $response = [
            "success" => false,
            "allowed" => false,
            "index" => []
        ];

        /**
         * Externals
         */


        $date = strtotime($date);

        if ($allowed) {
            $response["allowed"] = true;
            $index = Issue::find();
            $response["success"] = boolval($index);
            $index->rewind();
            $filtered = $index->filter(function ($issue) use ($date,$status) {
                $comment = json_decode(html_entity_decode($issue->comment));
//                echo $issue->id . PHP_EOL;
//                echo var_export($comment, true) . PHP_EOL;
//                echo json_encode($issue) . PHP_EOL;
//                var_dump($date);
//                var_dump($issue->resolve_date);
                if ($status == "closed" && $comment->report_status->id == 31 && $issue->resolve_date > $date) {
                    return $issue;
                } else if ($status == "new" && ($comment->report_status->id == 29 || $comment->report_status->id == 0) && $issue->report_date > $date) {
                    return $issue;
                } else if ($status =="progress" && ($comment->report_status->id == 30 || $comment->report_status->id == 32) && $issue->report_date > $date) {
                    return $issue;
                }
            });
            foreach ($filtered as $issue) {
                $response["index"][] = $issue;
            }
        }

        /**
         * Building response
         */
        $this->response
            ->setContent(
                json_encode($response)
            )
            ->send();
    }

    function now($status = "closed")
    {
        $this->index("now", $status);
    }
}