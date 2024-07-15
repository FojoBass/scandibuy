<?php

declare(strict_types=1);

namespace src\Models;

use src\Database\Database;

abstract class AbstractModel extends Database
{
 abstract public static function getAll($returnMod = 0): array;

 abstract public static function get(string $key): array;
}