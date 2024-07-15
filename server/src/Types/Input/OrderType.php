<?php

declare(strict_types=1);

namespace src\Types\Input;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends InputObjectType
{
 public function __construct()
 {
  parent::__construct([
   "name" => "OrderInput",
   "description" => "Type for input of user order",
   "fields" => [
    "product_id" => Type::nonNull(Type::id()),
    "size" => Type::nonNull(Type::int()),
    "color" => Type::nonNull(Type::string()),
    "qty" => Type::nonNull(Type::int()),
    "userId" => Type::nonNull(Type::id())
   ]
  ]);
 }
}
