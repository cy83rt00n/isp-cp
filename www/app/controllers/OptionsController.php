<?php

use Phalcon\Filter;

/**
 * Class OptionsController
 *
 * @RoutePrefix('/api/options')
 */
class OptionsController extends ControllerBase
{

    /**
     * @Get('/set/{name}/{value}')
     */
    public function set($name, $value)
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $name = $this->filter->sanitize($name, Filter::FILTER_ALPHANUM);
        $value = Helper::sanitizeByType(json_decode($value));

        $allowed = $this->isAllowed(__FUNCTION__);

        if ($allowed) {
            $option = Option::findFirst(["key=:key:", "bind" => ["key" => $name]]);
            if (!$option) {
                $option = new Option();
            }
            $option->key = $name;
            $option->value = json_encode($value);
            $success = $option->save();
        }


        /**
         * Build response
         */

        $this->response->setContent(
            json_encode([
                "success" => $success,
                "name" => $name,
                "value" => $value
            ])
        )
            ->send();
    }

    /**
     * @Get('/get/{name}')
     */
    public function get($name)
    {
        /**
         * Locals
         */
        $success = false;

        /**
         * Externals
         */
        $name = $this->filter->sanitize($name, Filter::FILTER_ALPHANUM);

        $allowed = $this->isAllowed(__FUNCTION__);

        if ($allowed) {
            $option = Option::findFirst(["key=:key:", "bind" => ["key" => $name]]);
            $success = boolval($option);
        }

        /**
         * Build response
         */

        $this->response->setContent(
            json_encode([
                "success" => $success,
                "name" => $name,
                "value" => $option
            ])
        )
            ->send();
    }

}

