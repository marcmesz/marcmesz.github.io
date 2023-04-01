<?php
header('Access-Control-Allow-Origin: *');
//header('Content-type: application/json');

$postUserName = strip_tags($_POST['name']);
$postUserEmail = strip_tags($_POST['email']);
$postUserText = strip_tags($_POST['text']);
$postUserCategory = strip_tags($_POST['category']);

if($postUserCategory === ""){
	$postUserCategory = "Nincs";
}

if(!empty($postUserName) && !empty($postUserEmail) && !empty($postUserText)){	
	
	$to = 'your@email.com'; // vesszovel elvalasztva tobb cimzett is lehet
	$subject = 'Your title subject';
	$message = '
	<html>
	<head>
	  <title>Your Title</title>
	</head>
	<body>
	  <p>
	  	<strong>Név:</strong> '.$postUserName.'<br />
		<strong>E-mail:</strong> '.$postUserEmail.'<br />
		<strong>Kategória:</strong> '.$postUserCategory.'<br />
	  </p>
	  <p><strong>Üzenet:</strong> <br />'.$postUserText.'</p>
	  <p>
	  ------<br />
	  Ez az e-mail a [your-domain] oldalon keresztül érkezett
	  </p>
	</body>
	</html>
	';
	
	$headers[] = 'MIME-Version: 1.0';
	$headers[] = 'Content-type: text/html; charset=utf8'; //charset=iso-8859-1
	
	$headers[] = 'From: '.$postUserName.' <'.$postUserEmail.'>';
	$headers[] = 'Reply-To: '.$postUserEmail;
	
	// Mail it
	mail($to, $subject, $message, implode("\r\n", $headers));

	$msg = "Success";
		
}
else{
	$msg = "UserError";
}

echo json_encode($msg);

?>