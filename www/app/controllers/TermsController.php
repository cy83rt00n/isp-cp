<?php

class TermsController extends ControllerBase
{

    public function index($parentId=0)
    {
        /**
         * Locals
         */

        $term           = new Term();
        $term->id       = 0;
        $term->slug     = "root";
        $term->title    = "root";
        $term->parentId = 0;
        $response = ["success"=>false, "term"=>$term, "children"=>[]];

        /**
         * Externals
         */
        $slug = $this->filter->sanitize($parentId, "absint");

        /**
         * Gathering data
         */
        $children = Term::find([
            "parentId=:parentId:",
            "bind" => [
                "parentId" => $parentId
            ]
        ]);

        foreach ($children as $child) {
            $response["children"][] = $child;
        }

        if ($slug !== 0) {
            $term = Term::findFirst($parentId);
        }

        if ($term) {
            $response["success"] = true;
            $response["term"]    = $term;
        }

        /**
         * Building response.
         */
        $content = json_encode($response);
        $this->response->setContent($content)->send();
    }

    public function item($id)
    {
        /**
         * Locals
         */

        $term           = new Term();
        $term->id       = 0;
        $term->slug     = "root";
        $term->title    = "root";
        $term->parentId = 0;
        $response = ["success"=>false, "term"=>$term];

        /**
         * Externals
         */
        $slug = $this->filter->sanitize($id, "absint");

        /**
         * Gathering data
         */
        $term = Term::findFirst($id);

        if ($term) {
            $response["success"] = true;
            $response["term"]    = $term;
        }

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

    public function delete($termId)
    {
        /**
         * Locals
         */
        $response = ["success"];

        /**
         * Externals
         */
        $termId = $this->filter->sanitize($termId, "absint");

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

}

