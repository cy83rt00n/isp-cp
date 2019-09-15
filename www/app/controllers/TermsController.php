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


        $term = Term::findFirst([
            "slug=:slug:",
            "bind" => [
                "slug" => $slug
            ]
        ]);

        if ($term) {
            $success = true;
            $children = Term::find(["parent=:termId:", "bind" => ["termId" => $term->id]]);
            foreach ($children as $t) {
                var_dump($t->title);
            }
        }

        /**
         * Building response.
         */
        $this->response->setContent(
            json_encode([
                "success" => $success,
                "item" => $term,
                "children" => $children
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
                "item" => $term
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
                "item" => $term
            ])
        )
            ->send();

    }

}

