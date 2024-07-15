<?php

declare(strict_types=1);

namespace src\Database;

final class DbQueries
{
 public const GET_ALL_CATEGORIES = 'select * from categories';

 public const GET_ALL_PRODUCTS = 'select * from products';
 public const GET_PRODUCT = 'select * from products where id = :id';

 public const GET_ATTRIBUTES = 'select * from attributes where product_id = :product_id';

 public const CREATE_ORDER = 'insert into orders (id, product_id, size, color, qty, userId) values (:id, :product_id, :size, :color, :qty, :userId)';
 public const GET_ALL_USER_ORDERS = 'select * from orders where userId = :userId';
 public const GET_ORDER = 'select * from orders where userId = :userId';
 public const GET_ALL_ORDERS = 'select * from orders';
}
