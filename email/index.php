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
$postLang = $_POST['lang'];
$webjazz = "WebJazz.hu - ";

if(!empty($postUserName) && !empty($postUserEmail) && !empty($postUserText)){	
	
	if(!empty($postHiddenValue)){
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

	$mail->Subject = $webjazz.$subject; // A level targya
	$mail->Body = $postUserText; // A level tartalma
	$mail->AltBody = strip_tags($postUserText); // A level szoveges tartalma

	if (!$mail->Send()) {
		if(empty($postLang) || $postLang==="hu"){
			$msg = 'Sikertelen üzenetküldés! A hiba oka: ' . $mail->ErrorInfo;
		}
		else{
			$msg = 'Error while sending! ' . $mail->ErrorInfo;
		}
		
		exit;
	}
	if(empty($postLang) || $postLang==="hu"){
		$msg = '<p class="sikeres-uzenet-p">Sikeres üzenetküldés!</p><p class="megadott-cimre">Hamarosan válaszolunk a megadott címre:</p><p class="e-mail-cim">' . $postUserEmail . '</p>';
	}
	else{
		$msg = '<p class="sikeres-uzenet-p">Message sent successfully!</p><p class="megadott-cimre">We will respond to the email you provided shortly:</p><p class="e-mail-cim">' . $postUserEmail . '</p>';
	}
	
}
else{
	if(empty($postLang) || $postLang==="hu"){
		$msg = '<p class="hiba-kitoltes-kotelezo">Hiba! A mezők kitöltése kötelező!</p>';
	}
	else{
		$msg = '<p class="hiba-kitoltes-kotelezo">Error! Input fields are required!</p>';
	}
}

echo $msg;


?>