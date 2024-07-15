<?php

declare(strict_types=1);

namespace src\Models;

use src\Database\DbQueries;
use src\Utils\Logger;

class AttributesModel extends AbstractModel
{
 public static function getAll($returnMod = 0): array
 {
  return [];
 }

 public static function get(string $key): array
 {
  return static::queryData(DbQueries::GET_ATTRIBUTES, ["product_id" => $key]);
 }
}
