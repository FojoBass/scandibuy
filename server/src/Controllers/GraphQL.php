<?php

declare(strict_types=1);

namespace src\controllers;

use GraphQL\GraphQL as GraphQLGraphQL;
use GraphQL\Type\Schema;
use src\Types\MutationType;
use src\Types\QueryType;
use src\Utils\TypeRegistry;
use Throwable;

class GraphQL
{
 public static function handle()
 {
  try {
   $schema = new Schema([
    'query' => TypeRegistry::getType(QueryType::class),
    'mutation' => TypeRegistry::getType(MutationType::class)
   ]);

   $rawInput = file_get_contents('php://input');
   $input = json_decode($rawInput, true);
   $query = $input['query'];
   $variableValues = isset($input['variables']) ? $input['variables'] : null;

   $rootValue = [];
   $result = GraphQLGraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues);
   $output = $result->toArray();
  } catch (Throwable $e) {
   echo "Error throwed";
   $output = [
    'errors' => [
     [
      'message' => $e->getMessage()
     ]
    ]
   ];
  }

  header('Content-Type: application/json');
  echo json_encode($output, JSON_THROW_ON_ERROR);
 }
}
