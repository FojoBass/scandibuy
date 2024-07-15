<?php

declare(strict_types=1);

namespace src\controllers;

use src\Models\OrderModel;
use src\Utils\Logger;

class OrderController
{
 public static function createOrder(array $orders): array
 {
  $userId = $orders[0]["userId"];
  foreach ($orders as $order) {
   $id = uniqid();
   $order["id"] = $id;
   OrderModel::create($order);
  }
  return OrderModel::getUserAll(0, ["userId" => $userId]);
 }
}
