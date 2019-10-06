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
        $response = [
        	"success" => false,
	        "allowed" => false,
	        "index" => []
        ];


        /**
         * Checking access
         */
        $allowed = $this->isAllowed(__FUNCTION__);


        /**
         * Granting access
         */
        if ($allowed) {
        	$response["allowed"] = true;
            $index = Issue::find(["columns" => "id,report_date,resolve_date,reporter,resolver,comment"]);
            $response["success"] = boolval($index);
            $index->rewind();
            while($index->valid()) {
            	$item = $index->current();
	            $reporter = User::findFirst($item->reporter);
	            $resolver = User::findFirst($item->resolver);
	            $item->writeAttribute("reporter",($reporter)?$reporter->login:'unknown@isp.cp');
	            $item->writeAttribute("resolver",($resolver)?$resolver->login:'unknown@isp.cp');
	            $response["index"][] = $item;
	            $index->next();
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
            $reporter = User::findFirst($item->reporter);
            $resolver = User::findFirst($item->resolver);
            $item->reporter = ($reporter)?$reporter->login:'unknown@isp.cp';
            $item->resolver = ($resolver)?$resolver->login:'unknown@isp.cp';
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
	     * Checking access
	     */
	    $allowed = $this->isAllowed(__FUNCTION__);
        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $userID = $this->currentUserId();

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
            $issue = Issue::findFirst(["id=:issueId: and resolve_date=0", "bind" => ["issueId" => $issueID]]);
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

