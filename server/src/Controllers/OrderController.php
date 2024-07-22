<?php

declare(strict_types=1);

namespace src\controllers;

use src\Models\OrderModel;
use src\Utils\Logger;

class OrderController
{
 public static function createOrder(array $orders): string
 {
  foreach ($orders as $order) {
   $id = uniqid();
   $order["id"] = $id;
   $order["attributes"] = json_encode($order["attributes"]);
   OrderModel::create($order);
  }
  return "Order created";
 }
}
