<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer.php';
require './Exception.php';
require './SMTP.php';

$postUserName = $_POST['name'];
$postUserEmail = $_POST['email'];
$postUserText = $_POST['text'];
$postHiddenValue = $_POST['hidden'];

if(isset($postUserName) && !empty($postUserName) && isset($postUserEmail) && !empty($postUserEmail) && isset($postUserText) && !empty($postUserText)){	
	
	if(isset($postHiddenValue) && !empty($postHiddenValue)){
		$subject = $postHiddenValue;
	}
	else{
		$subject = "Üzenet a honlapról";
	}

	$mail = new PHPMailer();
	$mail->CharSet = 'UTF-8';
	$mail->IsSMTP();
	$mail->Host = gethostname(); // SMTP szerverek
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
	$mail->Port = 465;
	$mail->Username = 'info@webjazz.hu';
	$mail->Password = 'v4*rQq%3nEFr';
	$mail->From = $postUserEmail; // Felado e-mail cime
	$mail->FromName = strip_tags($postUserName); // Felado neve
	$mail->AddAddress('meszoly.marton@gmail.com', 'Mészöly Márton'); // Cimzett es neve
	$mail->AddReplyTo($postUserEmail, $postUserName); // Valaszlevel ide

	$mail->WordWrap = 80; // Sortores allitasa
	$mail->IsHTML(true); // Kuldes HTML-kent

	$mail->Subject = $subject; // A level targya
	$mail->Body = $postUserText; // A level tartalma
	$mail->AltBody = strip_tags($postUserText); // A level szoveges tartalma

	if (!$mail->Send()) {
	$msg = 'Sikertelen üzenetküldés! A hiba oka: ' . $mail->ErrorInfo;
	exit;
	}

	$msg = '<p>Sikeres üzenetküldés!</p><p>Hamarosan válaszolunk a megadott címre: ' . $postUserEmail . '</p>';
	
	
}
else{
	$msg = '<p>Hiba! A mezők kitöltése kötelező!</p>';
}

echo $msg;


?>