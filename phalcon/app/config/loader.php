<?php

use Phalcon\Loader;

$loader = new Loader();

/**
 * We're a registering a set of directories taken from the configuration file
 */
$loader->registerDirs(
    [
        $di->getConfig()->application->controllersDir,
        $di->getConfig()->application->modelsDir,
        $di->getConfig()->application->libraryDir
    ]
)->register();
