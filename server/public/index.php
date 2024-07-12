<?php

require_once __DIR__ . '/../vendor/autoload.php';

$jsonString = file_get_contents(__DIR__ . '/../Scandiweb.json');

if (!$jsonString) die("Error reading JSON file");

$data = json_decode($jsonString, true);
extract($data["data"]);



$dsn = "mysql:hostname=localhost;port=3306;dbname=mysql_testdb;charset=utf8mb4";
$pdo = new PDO($dsn, 'root', "", [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);


$attributes = [];
$attributeItems = [];
$prices = [];

function queryDb($query, $pdo)
{
 $statement = $pdo->prepare($query);
 $statement = $statement->execute();
}

function prepGallery($products)
{
 $links = [];
 foreach ($products as $product) {
  foreach ($product["gallery"] as $gallery) {
   $link["product_id"] = $product["id"];
   $link["url"] = $gallery;
   array_push($links, $link);
  }
 };
 return $links;
}

function inserter($items, $resolver)
{
 foreach ($items as $item) {
  $resolver($item);
 }
}

function insertCateg($category)
{
 $query = "insert into categories (name) values ({$category["name"]})";

 print_r($query);
}

function insertProduct($product)
{
 $query = "insert into products (id, inStock, description, category, brand) values ({$product["id"]}, {$product["inStock"]}, {$product["description"]}, {$product["category"]}, {$product["brand"]})";

 print_r($query);
}

function insertGallery($link)
{
 $query = "insert into galleries (product_id, url) values ({$link["product_id"]}, {$link["url"]})";

 print_r($query);
}

$galleries = prepGallery($products);

// todo Prep attributes, attibute_items, and prices

// inserter($categories, 'insertCateg');
// inserter($products, 'insertProduct');
inserter($galleries, 'insertGallery');
