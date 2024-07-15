<?php

declare(strict_types=1);

namespace src\Utils;

final class TypeRegistry
{
 private static array $types = [];

 public static function getType(string $className): \Closure
 {
  return fn () => self::$types[$className] ??= new $className();
 }
}