<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_trading_platform_v2";

global $conn;
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
