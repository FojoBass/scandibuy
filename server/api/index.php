<?php

use src\Config\Config;
use src\Database\Database;

require_once __DIR__ . '/../vendor/autoload.php';

// $dotenv = Dotenv::createImmutable(__DIR__);
// $dotenv->load();

new Database(Config::getConfig(), $_ENV["DB_USER"], $_ENV["DB_PWD"]);

$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
  $r->post('/graphql', [src\Controllers\GraphQL::class, 'handle']);
});

$routeInfo = $dispatcher->dispatch(
  $_SERVER['REQUEST_METHOD'],
  $_SERVER['REQUEST_URI']
);

switch ($routeInfo[0]) {
  case FastRoute\Dispatcher::NOT_FOUND:
    echo '404 Not found!';
    break;
  case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
    $allowedMethods = $routeInfo[1];
    echo '405 Not allowed';
    break;
  case FastRoute\Dispatcher::FOUND:
    $handler = $routeInfo[1];
    $vars = $routeInfo[2];
    echo $handler($vars);
    break;
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
