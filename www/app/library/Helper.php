<?php

use Phalcon\Filter;

class Helper
{
    public static function sanitizeByType($value)
    {
        $Filter = new Filter();
        switch (gettype($value)) {
            case "integer":
                $as = Filter::FILTER_ABSINT;
                break;
            case "string":
                $as = Filter::FILTER_STRING;
                break;
            case "double":
                $as = Filter::FILTER_FLOAT;
                break;
            case "array":
                foreach ($value as $index => $indexValue) {
                    $value[$index] = self::sanitizeByType($indexValue);
                }
                return $value;
                break;
            case "object":
                foreach ($value as $fieldName => $fieldValue) {
                    $value->$fieldName = self::sanitizeByType($fieldValue);
                }
                return $value;
                break;
        }
        return $Filter->sanitize($value, $as);
    }
}