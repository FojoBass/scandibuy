<?php

declare(strict_types=1);

namespace App\Models;

use App\Database\DbQueries;

class CategoryModel extends AbstractModel
{
    public static function getAll(int $returnMod = 0, $params = []): array
    {
        return static::queryAllData(DbQueries::GET_ALL_CATEGORIES, $returnMod);
    }

    public static function get(string $key): array
    {
        return [];
    }
}