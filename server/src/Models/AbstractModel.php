<?php

declare(strict_types=1);

namespace App\Models;

use App\Database\Database;

abstract class AbstractModel extends Database
{
    abstract public static function getAll(int $returnMod = 0): array;

    abstract public static function get(string $key): array;
}