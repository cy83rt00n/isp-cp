<?php

use Phalcon\Mvc\Controller;

class IssuesController extends Controller
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
         * Externals
         */
        $userID = $this->request->get("id", "absint");
        $Acl = $this->getDI()->getAcl();


        /**
         * Checking access
         */
        $allowed = $Acl->isAllowed(AclHelper::$roles[$userID], "Issues", "index");

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
                    "index" => json_encode($index)
                ])
            )
            ->send();
    }

    /**
     * Gets full info about issue by its id.
     * @param $issueID
     */
    public function item($issueID)
    {
        /**
         * Locals
         */
        $issue = null;

        /**
         * Externals
         */
        $issueID = $this->filter->sanitize($issueID, "absint");
        $userID = $this->request->get("id", "absint");
        $Acl = $this->getDI()->getAcl();

        /**
         * Checking access
         */

        $allowed = $Acl->isAllowed(AclHelper::$roles[$userID], "Issues", "item");

        /**
         * Granting access
         */
        if ($allowed) {
            $issue = Issue::findFirst($issueID);
        }

        /**
         * Building response
         */
        $this->response
            ->setContent(
                json_encode([
                    "success" => boolval($issue),
                    "item" => $issue
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
        $userID = $this->getDI()->getRequest()->get("id", "absint");
        $Acl = $this->getDI()->getAcl();

        /**
         * Checking access
         */
        $allowed = $Acl->isAllowed(AclHelper::$roles[$userID], "Issues", "report");

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
        $userID = $this->getDI()->getRequest()->get("id", "absint");
        $Acl = $this->getDI()->getAcl();
        /**
         * Checking access
         */
        $allowed = $Acl->isAllowed(AclHelper::$roles[$userID], "Issues", "report");

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

