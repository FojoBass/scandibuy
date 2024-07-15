<?php

declare(strict_types=1);

namespace src\Models;

use src\Database\DbQueries;
use src\Utils\Logger;

class CategoryModel extends AbstractModel
{
 public static function getAll($returnMod = 0): array
 {
  return static::queryAllData(DbQueries::GET_ALL_CATEGORIES, $returnMod);
 }

 public static function get(string $key): array
 {
  return [];
 }
}