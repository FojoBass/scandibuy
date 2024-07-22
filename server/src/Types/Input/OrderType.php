<?php

declare(strict_types=1);

namespace src\Types\Input;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;
use src\Utils\TypeRegistry;

class OrderType extends InputObjectType
{
 public function __construct()
 {
  parent::__construct([
   "name" => "OrderInput",
   "description" => "Type for input of user order",
   "fields" => [
    "product_id" => Type::nonNull(Type::id()),
    "attributes" => Type::nonNull(TypeRegistry::getJsonType()),
    "qty" => Type::nonNull(Type::int()),
   ]
  ]);
 }
}
