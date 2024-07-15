<?php

declare(strict_types=1);

namespace src\Database;

use PDO;
use PDOStatement;
use src\Config\Config;
use src\Utils\Logger;
use Throwable;

class Database
{
 protected PDO $pdo;
 protected PDOStatement $statement;
 private static self $instance;

 public function __construct(array $config, string $username, string $password)
 {
  $dsn = 'mysql:' . http_build_query($config, "", ";");
  $this->pdo = new PDO($dsn, $username, $password, [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
 }

 private function query(string $query, array $params = []): PDOStatement
 {
  $this->statement = $this->pdo->prepare($query);
  $this->statement->execute($params);
  return $this->statement;
 }

 private static function checkInstance()
 {
  if (!isset(self::$instance)) self::$instance = new self(Config::getConfig(), $_ENV["DB_USER"], $_ENV["DB_PWD"]);
 }

 protected static function queryAllData(string $query, int $returnMod, array $params = []): array
 {
  try {
   self::checkInstance();
   return self::$instance->query($query, $params)->fetchAll($returnMod);
  } catch (Throwable $e) {
   Logger::error($e);
  }
 }

 protected static function queryData(string $query, array $params): array
 {
  try {
   self::checkInstance();
   return self::$instance->query($query, $params)->fetch();
  } catch (Throwable $e) {
   Logger::error($e);
  }
 }

 protected static function setData(string $query, array $params)
 {
  self::checkInstance();
  self::$instance->query($query, $params);
 }
}
