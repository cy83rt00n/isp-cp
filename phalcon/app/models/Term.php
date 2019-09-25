<?php

use Phalcon\Mvc\Model;

class Term extends Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var string
     */
    public $slug;

    /**
     *
     * @var string
     */
    public $title;

    /**
     *
     * @var integer
     */
    public $parentId;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSchema($_ENV["project_database_name"]);
        $this->setSource("terms");
    }

    /**
     * Returns table name mapped in the model.
     *
     * @return string
     */
    public function getSource():string
    {
        return 'terms';
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Term[]|Term|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null)
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Term|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

    public function beforeCreate()
    {
        return $this->parentId === 0 || self::findFirst($this->parentId);
    }

    public function beforeDelete()
    {
        return sizeof(self::find(["parentId=" . $this->id])) == 0;
    }

}
