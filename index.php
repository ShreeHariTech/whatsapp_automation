<?php
// WhatsApp Number (Change as per requirement)
$phone = "917623977045"; // WhatsApp Number to send message
$message = "System Login Success!"; // Predefined Message

// Generate WhatsApp Link
$whatsapp_url = "https://wa.me/$phone?text=" . urlencode($message);

// Generate QR Code URL
$qr_code_url = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" . urlencode($whatsapp_url);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login with QR Scan</title>
    <meta http-equiv="refresh" content="1;url=<?php echo $whatsapp_url; ?>"> <!-- Auto Redirect -->
</head>
<body>

    <h2>Scan This QR Code to Login</h2>
    <img src="<?php echo $qr_code_url; ?>" alt="WhatsApp Login QR Code">

    <p>If the page doesn't redirect automatically, <a href="<?php echo $whatsapp_url; ?>">click here</a>.</p>

</body>
</html>
