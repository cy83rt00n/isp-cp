<?php

class TermsController extends ControllerBase
{

    public function index($parent = 0)
    {


	    /**
	     * Checking access
	     */
	    $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Locals
         */

        $rootTerm           = new stdClass();
        $rootTerm->id       = 0;
        $rootTerm->slug     = "root";
        $rootTerm->title    = "root";
        $rootTerm->parentId = 0;
        $rootTerm->children = [];
        $response = ["success"=>false, "terms"=>[$rootTerm]];

        /**
         * Externals
         */

        $parentId = (is_numeric($parent)) ? $this->filter->sanitize($parent, "absint", false) : false;
        $filter = ["parentId=:parentId:", "bind" => ["parentId" => $parentId]];
        if ($parentId === false) {
            $slug = $this->filter->sanitize($parent, "string", false);
            $filter = ["slug=:slug:", "bind" => ["slug" => $slug]];
        }

        /**
         * Gathering data
         */
        if($allowed) {
            $children = Term::find($filter);

            if (sizeof($children)>0) $response["terms"] = [];

            foreach ($children as $child) {
                $response["terms"][] = $this->item($child->id, true);
            }

            $response["success"] = true;
        }

        /**
         * Building response.
         */
        $content = json_encode($response);
        $this->response->setContent($content)->send();
    }

    public function item($id, $internal=false)
    {
	    /**
	     * Checking access
	     */
	    $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Locals
         */

        $response = ["success"=>false, "term"=>null];

        /**
         * Externals
         */
        $id = $this->filter->sanitize($id, "absint");


        /**
         * Gathering data
         */
        if($allowed) {
            $term = Term::findFirst($id);

            if ($term) {
                $response["success"] = true;
                $response["term"] = $this->copyObject($term,new stdClass());
                $response["term"]->children = [];
                $children = Term::find([
                    "parentId=:parentId:",
                    "bind" => [
                        "parentId" => $id
                    ]
                ]);
                foreach ($children as $child) {
                    $response["term"]->children[] = $this->item($child->id, true);
                }

            } else {
                $response["success"] = true;
                $response["term"] = $this->copyObject(new Term(), new stdClass());
                $response["term"]->slug = "root";
                $response["term"]->title = "Корень";
                $response["term"]->children = [];
            }
        }

        if ($internal) return $response["term"];

        /**
         * Building response.
         */
        $content = json_encode($response);
        $this->response->setContent($content)->send();
    }

    public function create()
    {
        /**
         * Locals
         */
        $response = ["success"=>false, "term"=>null, "children"=>[]];

        /**
         * Checking permissions
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Gathering data
         */
        $response["success"] = false;
        if ($allowed) {
            $term                = new Term();
            $term->slug          = $this->request->get("slug", "string", '');
            $term->title         = $this->request->get("title", "string", '');
            $term->parentId      = $this->request->get("parent", "absint", 0);
            $response["success"] = $term->create();
            $response["term"]    = $term;
            $response["children"] = [];
        }

        /**
         * Building response.
         */
        $content = json_encode($response);
        $this->response->setContent($content)->send();

    }

    public function delete()
    {
        /**
         * Locals
         */
        $response = ["success"];

        /**
         * Externals
         */
        $termId = $this->request->get("id", "absint", 0);

        /**
         * Cheking permissions
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        /**
         * Gathering data
         */
        $response["success"] = false;
        if ($allowed) {
            $term = Term::findFirst($termId);
            if ($term) {
                $response["success"] = $term->delete();
            }
        }

        /**
         * Building response.
         */
        $content = json_encode($response);
        $this->response->setContent($content)->send();

    }

    public function schema()
    {

        /**
         * Building response.
         */
        $content = json_encode([
            "success"  => true,
            "term"     => array_keys(get_class_vars("Term")),
            "children" => json_encode(["termId" => array_keys(get_class_vars("Term"))])
        ]);
        $this->response->setContent($content)->send();
    }

    private function copyObject($source, $recipient)
    {
        foreach ($source as $fieldName=>$fieldValue) {
            $recipient->$fieldName = $fieldValue;
        }

        return $recipient;
    }

}

