<?php

declare(strict_types=1);

namespace src\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use src\controllers\OrderController;
use src\Types\Input\OrderType as InputOrderType;
use src\Types\Output\OrderType;
use src\Utils\Logger;
use src\Utils\TypeRegistry;
use Throwable;

class MutationType extends ObjectType
{
 public function __construct()
 {
  parent::__construct([
   'name' => 'Mutation',
   'fields' => [
    "createOrder" => [
     "type" => Type::listOf(TypeRegistry::getType(OrderType::class)),
     "args" => [
      "orders" => [
       "type" => Type::listOf(TypeRegistry::getType(InputOrderType::class))
      ]
     ],
     "resolve" => static function ($rootValue, array $args): array {
      try {
       return OrderController::createOrder($args["orders"]);
      } catch (Throwable $e) {
       Logger::error($e);
      }
     }
    ]
   ]
  ]);
 }
}
