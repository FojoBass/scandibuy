<?php

declare(strict_types=1);

namespace src\Types\Output;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use src\Models\ProductModel;
use src\Utils\OutputResolver;
use src\Utils\TypeRegistry;

class OrderType extends ObjectType
{
 public function __construct()
 {
  parent::__construct([
   "name" => "OrderOutput",
   "fields" => [
    "id" => Type::nonNull(Type::id()),
    "qty" => Type::nonNull(Type::int()),
    "attibutes" => Type::nonNull(Type::string()),
    "product" => [
     "type" => TypeRegistry::getType(ProductType::class),
     "resolve" => fn (array $order) => OutputResolver::resolver([ProductModel::class, "get"], [$order["product_id"]])
    ]
   ]
  ]);
 }
}
