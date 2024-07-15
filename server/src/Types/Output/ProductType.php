<?php

declare(strict_types=1);

namespace src\Types\Output;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use src\Models\AttributesModel;
use src\Utils\Logger;
use src\Utils\OutputResolver;
use src\Utils\TypeRegistry;
use Throwable;

class ProductType extends ObjectType
{
 public function __construct()
 {
  parent::__construct([
   "name" => "Product",
   "description" => "Type for Product",
   "fields" => [
    'id' => Type::nonNull(Type::id()),
    'name' => Type::nonNull(Type::string()),
    'inStock' => Type::nonNull(Type::int()),
    'description' => Type::nonNull(Type::string()),
    'category' => Type::nonNull(Type::string()),
    'brand' => Type::nonNull(Type::string()),
    'gallery' => Type::nonNull(Type::string()),
    "prices" => Type::nonNull(Type::string()),
    "attributes" => [
     "type" => TypeRegistry::getType(AttributeType::class),
     "resolve" => fn (array $product) => OutputResolver::resolver([AttributesModel::class, "get"], [$product["id"]])
    ]
   ]
  ]);
 }
}
