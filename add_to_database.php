<?php
session_start(); // Session startion 
include("db.php");

// JSON data decode 
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    die("No data received");
}

// User ID check 
$username = $_SESSION['username'];
$user_id = $_SESSION['user_id']; 

// if id not in sesssion remove from database
if(empty($user_id)) {
    $res = mysqli_query($con, "SELECT id FROM users WHERE username = '$username'");
    $row = mysqli_fetch_assoc($res);
    $user_id = $row['id'];
}

$currentDate = date("Y-m-d");

// different item has different entry
foreach ($data as $item) {
    $title = mysqli_real_escape_string($con, $item['title']);
    $price = $item['price'];
    $quantity = $item['quantity'];
    $subtotal = $price * $quantity;
    $invoice = $item['invoice_number'];

    $sql = "INSERT INTO orders (price, title, quantity, subtotal_amount, date, invoice_number, user_id, customer_name) 
            VALUES ('$price', '$title', '$quantity', '$subtotal', '$currentDate', '$invoice', '$user_id', '$username')";
    
    mysqli_query($con, $sql);
}

echo "Success";
?>