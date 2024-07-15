<?php

declare(strict_types=1);

namespace src\Database;

final class DbQueries
{
 public const GET_ALL_CATEGORIES = 'select * from categories';
 public const GET_ALL_PRODUCTS = 'select * from products';
}