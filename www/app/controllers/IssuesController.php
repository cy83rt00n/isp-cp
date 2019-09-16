<?php

class IssuesController extends ControllerBase
{

    /**
     * Gets index of issues.
     */
    public function index()
    {
        /**
         * Locals
         */
        $index = null;


        /**
         * Checking access
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Granting access
         */
        if ($allowed) {
            $index = Issue::find(["columns" => "id,report_date,resolve_date,comment"]);
        }

        /**
         * Building response
         */
        $this->response
            ->setContent(
                json_encode([
                    "success" => boolval($index),
                    "index" => json_encode($index),
                    "allowed" => $allowed
                ])
            )
            ->send();
    }

    /**
     * Gets full info about issue by its id.
     * @param $issueID
     */
    public function item($itemID)
    {
        /**
         * Locals
         */
        $item = null;

        /**
         * Externals
         */
        $itemID = $this->filter->sanitize($itemID, "absint", array_flip(AclHelper::$roles)["Guest"]);

        /**
         * Checking access
         */

        $allowed = $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Granting access
         */
        if ($allowed) {
            $item = Issue::findFirst($itemID);
        }

        /**
         * Building response
         */
        $this->response
            ->setContent(
                json_encode([
                    "success" => boolval($item),
                    "item" => $item
                ])
            )
            ->send();
    }

    /**
     * Creates new report.
     */
    public function report()
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $userID = $this->currentUserId();

        /**
         * Checking access
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Granting access
         */
        if ($allowed) {
            $issue = new Issue();
            $issue->report_date = time();
            $issue->resolve_date = 0;
            $issue->comment = $this->request->get("comment", "string", "");
            $issue->reporter = $userID;
            $issue->resolver = 0;
            $success = $issue->create();
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success,
                "item" => $issue
            ])
        )
            ->send();
    }

    public function update($issueID)
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $issueID = $this->filter->sanitize($issueID, "absint");
        $userID = $this->currentUserId();

        /**
         * Checking access
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Granting access
         */
        if ($allowed) {
            $issue = Issue::findFirst($issueID);
            if (($issue instanceof Issue)) {
                $issue->comment = $this->request->get("comment", "string", $issue->comment);
                $success = $issue->update();
            }
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success,
                "item" => $issue
            ])
        )
            ->send();
    }

    /**
     * Updates issue by its id. Marked as resolved.
     */

    public function resolve($issueID)
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $issueID = $this->filter->sanitize($issueID, "absint");
        $userID = $this->currentUserId();
        /**
         * Checking access
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Granting access
         */
        if ($allowed) {
            $issue = Issue::findFirst($issueID);
            if (($issue instanceof Issue)) {
                $issue->resolve_date = time();
                $issue->comment = $this->request->get("comment", "string", $issue->comment);
                $issue->resolver = $userID;
                $success = $issue->update();
            }
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success,
                "item" => $issue
            ])
        )
            ->send();

    }

}

