<?php

declare(strict_types=1);

namespace src\Utils;

use Throwable;

final class OutputResolver
{
 public static function resolver(callable $resolveFunc, array $arg = [])
 {
  try {
   return call_user_func($resolveFunc, $arg[0] ?? 0);
  } catch (Throwable $e) {
   echo "Error thrown";
   Logger::error($e);
  }
 }
}
