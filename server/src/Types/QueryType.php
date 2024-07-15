<?php

declare(strict_types=1);

namespace src\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use PDO;
use src\Models\CategoryModel;
use src\Models\ProductModel;
use src\Utils\Logger;
use src\Utils\TypeRegistry;
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
     "resolve" => static function () {
      try {
       return CategoryModel::getAll(PDO::FETCH_COLUMN);
      } catch (Throwable $e) {
       Logger::error($e);
      }
     }
    ],
    'products' => [
     "type" => Type::listOf(TypeRegistry::getType(ProductType::class)),
     "description" => "This returns all products",
     "resolve" => static function () {
      try {
       $products = ProductModel::getAll();
       var_dump($products);
       return $products;
      } catch (Throwable $e) {
       Logger::error($e);
      }
     }
    ]
   ]
  ]);
 }
}