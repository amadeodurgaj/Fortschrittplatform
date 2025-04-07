<?php
// sendEmail.php

// Load PHPMailer classes (adjust paths if needed)

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    // Collect and sanitize the form inputs
    $name    = filter_input(INPUT_POST, 'contactName', FILTER_SANITIZE_STRING);
    $email   = filter_input(INPUT_POST, 'contactEmail', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'contactMessage', FILTER_SANITIZE_STRING);

    // Validate the required fields
    if (empty($name) || empty($email) || empty($message)) {
        die("Bitte füllen Sie alle Felder aus.");
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Set mailer to use SMTP
        $mail->isSMTP();
        
        // Set your SMTP server details – Mercury is running on localhost by default
        $mail->Host = 'localhost';
        $mail->Port = 25; // Default Mercury SMTP port
        
        // Enable SMTP authentication, using the Mercury user created earlier
        $mail->SMTPAuth = true;
        $mail->Username = 'taskquest';      // Mercury username
        $mail->Password = 'tasK12QQst.G.';// Mercury password

        // If your Mercury server supports encryption, you can enable it.
        // For example, if using TLS:
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        // $mail->Port = 587;
        // Otherwise, if no encryption is used, leave SMTPSecure unset or explicitly set to an empty string:
        // $mail->SMTPSecure = '';

        // Set the sender's address (from the form submission)
        // Note: Some SMTP servers may require that the sender's email belongs to your domain.
        $mail->setFrom($email, $name);

        // Add the recipient (your mailbox where you want to receive contact messages)
        $mail->addAddress('taskquest1@gmail.com');

        // Set email format to plain text
        $mail->isHTML(false);

        // Set subject and body of the email
        $mail->Subject = "Neue Nachricht von: $name";
        $mail->Body    = "Name: $name\nE-Mail: $email\n\nNachricht:\n$message\n";

        // Attempt to send the email
        $mail->send();
        echo "Email wurde erfolgreich gesendet. Vielen Dank für Ihre Nachricht!";
    } catch (Exception $e) {
        // An error occurred; output the error message.
        echo "Fehler beim Senden der E-Mail: {$mail->ErrorInfo}";
    }
} else {
    // If the form is not submitted, redirect back to the contact page.
    header("Location: contact.html");
    exit;
}
?>
