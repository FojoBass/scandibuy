<?php

declare(strict_types=1);

namespace App\Models;

use App\Database\DbQueries;

class ProductModel extends AbstractModel
{
    public static function getAll(int $returnMod = 0): array
    {
        return static::queryAllData(DbQueries::GET_ALL_PRODUCTS, $returnMod);
    }

    public static function get(string $key, bool $isArrayReturn = false): array
    {
        return $isArrayReturn ? static::queryData(DbQueries::GET_CATEGORY_PRODUCTS, ["category" => $key], $isArrayReturn): static::queryData(DbQueries::GET_PRODUCT, ["id" => $key]);
    }
}