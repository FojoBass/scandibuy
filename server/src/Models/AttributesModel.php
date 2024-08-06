<?php

declare(strict_types=1);

namespace App\Models;

use App\Database\DbQueries;

class AttributesModel extends AbstractModel
{
    public static function getAll(int $returnMod = 0): array
    {
        return [];
    }

    public static function get(string $key): array
    {
        return static::queryData(DbQueries::GET_ATTRIBUTES, ["product_id" => $key]);
    }
}