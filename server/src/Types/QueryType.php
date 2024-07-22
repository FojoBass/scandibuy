<?php

declare(strict_types=1);

namespace src\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use PDO;
use src\Models\CategoryModel;
use src\Models\OrderModel;
use src\Models\ProductModel;
use src\Types\Output\OrderType;
use src\Utils\Logger;
use src\Utils\TypeRegistry;
use src\Utils\OutputResolver;
use src\Types\Output\ProductType;
use Throwable;

class QueryType extends ObjectType
{
 public function __construct()
 {
  parent::__construct([
   'name' => "Query",
   "fields" => [
    "categories" => [
     "type" => Type::listOf(Type::string()),
     "description" => "This returns all categories",
     "resolve" => fn () => OutputResolver::resolver([CategoryModel::class, "getAll"], [PDO::FETCH_COLUMN])
    ],
    'products' => [
     "type" => Type::listOf(TypeRegistry::getType(ProductType::class)),
     "description" => "This returns all products",
     "resolve" => fn () => OutputResolver::resolver([ProductModel::class, 'getAll'])
    ],
    'product' => [
     "type" => TypeRegistry::getType(ProductType::class),
     "description" => "This returns a single product",
     "args" => [
      "id" => Type::nonNull(Type::id())
     ],
     "resolve" => fn ($rootValue, array $args) => OutputResolver::resolver([ProductModel::class, 'get'], [$args["id"]])
    ],
    "categProduct" => [
     "type" => Type::listOf(TypeRegistry::getType(ProductType::class)),
     "description" => "This returns products of same category",
     "args" => [
      "categ" => Type::nonNull(Type::string())
     ],
     "resolve" => fn ($rootValue, array $args) => OutputResolver::resolver([ProductModel::class, "get"], [$args["categ"]], true)
    ],
    "orders" => [
     "type" => Type::listOf(TypeRegistry::getType(OrderType::class)),
     "description" => "This returns all orders",
     "resolve" => fn () => OutputResolver::resolver([OrderModel::class, "getAll"])
    ],
    "user_orders" => [
     "type" => Type::listOf(TypeRegistry::getType(OrderType::class)),
     "description" => "This returns all orders a user has made",
     "args" => [
      "userId" => Type::nonNull(Type::id())
     ],
     "resolve" => fn ($rootValue, $args) => OutputResolver::resolver([OrderModel::class, 'getUserAll'], [["userId" => $args["userId"]]])
    ]
   ]
  ]);
 }
}
