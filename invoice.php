<?php
session_start();
require('db.php'); 
date_default_timezone_set("Asia/Kolkata");

// User ID check 
$username = isset($_SESSION['username']) ? $_SESSION['username'] : "Guest";
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['items'])) {
    $items = $_POST['items'];
    $customer_name = isset($_POST['customer_name']) ? $_POST['customer_name'] : $username;
    $order_id = "RC" . rand(1000, 9999);
    $date = date("Y-m-d H:i:s"); 
    $grandTotal = 0;

    foreach ($items as $item) {
        $details = explode("|", $item);
        $title = mysqli_real_escape_string($con, $details[0]);
        // Price se 'Rs' aur spaces hatane ke liye
        $priceNum = (float)preg_replace('/[^0-9.]/', '', $details[1]);
        $qty = (int)$details[2];
        $itemTotal = $priceNum * $qty;
        $grandTotal += $itemTotal;

        // Query main
        $sql = "INSERT INTO orders (price, title, quantity, subtotal_amount, date, invoice_number, user_id, customer_name) 
                VALUES ('$priceNum', '$title', '$qty', '$itemTotal', '$date', '$order_id', '$user_id', '$customer_name')";
        mysqli_query($con, $sql);
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Royal Cafe Receipt #<?php echo $order_id; ?></title>
    <link rel="stylesheet" href="../assets/css/invoice.css">
    <style>
        /* when we click the print button it's hide the button */
        @media print { .btn-box { display: none; } }
    </style>
</head>
<body>
    <div class="invoice-card">
        <div class="header">
           <div class="brand-box">
                <img src="../assets/images/logo.png" alt="Logo" class="brand-logo">
                <h1 class="brand-name">ROYAL CAFE</h1>
            </div>
            <p class="tagline">The Perfect Brew for You</p>
        </div>

        <div class="info-section">
            <p>Order ID: <strong>#<?php echo $order_id; ?></strong></p>
            <p>Customer: <strong><?php echo htmlspecialchars($customer_name); ?></strong></p>
            <p>Date: <?php echo $date; ?></p>
        </div>

        <table>
            <thead>
                <tr>
                    <th style="text-align:left;">Item</th>
                    <th>Qty</th>
                    <th style="text-align:right;">Price</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                foreach ($items as $item) {
                    $details = explode("|", $item);
                    echo "<tr>
                            <td>{$details[0]}</td>
                            <td>{$details[2]}</td>
                            <td style='text-align:right;'>{$details[1]}</td>
                          </tr>";
                } 
                ?>
                <tr style="font-weight:bold; border-top:2px solid #eee;">
                    <td colspan="2">GRAND TOTAL</td>
                    <td style="text-align:right;">Rs <?php echo number_format($grandTotal, 2); ?></td>
                </tr>
            </tbody>
        </table>

        <div class="footer">
            <p><b>Thank you for shopping with Royal Cafe!</b></p>
            <p>Follow us on Instagram @RoyalCafe ☕</p>
        </div>

        <div class="btn-box">
            <button onclick="window.print()" class="btn">Print Bill</button>
            <a href="index.php" class="btn btn-secondary" style="text-decoration:none; padding:10px; background:#6F4E37; color:#fff; border-radius:5px;">Back to Menu</a>
        </div>
    </div>
</body>
</html>
<?php
} else {
    // if the item are not set locate to home page
    header("Location: index.php");
    exit();
}
?>