<?php

class TermsController extends ControllerBase
{

    public function index($slug = "")
    {
        /**
         * Locals
         */
        $success = false;
        $children = false;

        /**
         * Externals
         */
        $slug = $this->filter->sanitize($slug, "string");

        if ($slug == "root") {
            $term = new stdClass();
            $term->id = 0;
            $term->slug = "root";
            $term->title = "";
            $term->parent = 0;
            $children = Term::find(["parentId=:termId:", "bind" => ["termId" => $term->id]]);
        } else {
            $children = Term::find([
                "slug=:slug:",
                "bind" => [
                    "slug" => $slug
                ]
            ]);
            $term = Term::findFirst($children[0]->parentId);
        }

        if ($term) {
            $success = true;
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success,
                "data" => [
                    "term" => $term,
                    "children" => $children
                ]
            ])
        )
            ->send();
    }

    public function create()
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Cheking permissions
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        if ($allowed) {
            $term = new Term();
            $term->slug = $this->request->get("slug", "string", '');
            $term->title = $this->request->get("title", "string", '');
            $term->parentId = $this->request->get("parent", "absint", 0);
            $success = $term->create();
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success,
                "data" => [
                    "term" => $term
                ]
            ])
        )
            ->send();

    }

    public function delete($termId)
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $termId = $this->filter->sanitize($termId, "absint");

        /**
         * Cheking permissions
         */
        $allowed = $this->isAllowed(__FUNCTION__);

        if ($allowed) {
            $term = Term::findFirst($termId);
            if ($term) {
                $success = $term->delete();
            }
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success,
                "data" => [
                    "item" => $term
                ]
            ])
        )
            ->send();

    }

}

