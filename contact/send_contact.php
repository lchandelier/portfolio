<?php
$date_format = "d/m/Y H:i:s";
$email_dest = "lena.chandelier@pm.me";
$subject = "[Site] - Nouveau contact";
$template_sent = '../contact-sent.html';


if($_POST['comment_blop'] == '') {
	$msg = "post_id: " . $_POST["post_id"] . "\n";
	$msg .= "email: " . $_POST["email"] . "\n";
	$msg .= "---\n";
	$msg .= "- id: ?\n";
	$msg .= "  author: " . $_POST["name"] . "\n";
	$msg .= "  date: " . date($date_format) . "\n";
	$msg .= "  subject: \n" . $_POST["subject"];
	$msg .= "  contents: \n" . $_POST["comment"];

	$headers = "From: noreply@lena-chandelier.me\n";
	$headers .= "Content-Type: text/plain; charset=utf-8";
	
	if($_POST["email"] != '') {
		
		if($_POST['language'] == 'en') {
			$template_sent = '../en/contact-sent-en.html';
		}

		// server error
		if (mail($email_dest, $subject, $msg, $headers))
		{
			include $template_sent;
		}
		else
		{
			if($_POST['language'] == 'en') {
				echo 'Your contact request can\'t be sent.';
			
			}
			else {
				echo "Votre demande n'a pas pu être envoyée.";
			}
		}
	}
	else {
		// all fields not filled
		if($_POST['language'] == 'en') {
			$template_sent = '../contact-not-sent-en.html';
			include $template_sent;
		}
		else {
			$template_sent = '../contact-not-sent.html';
			include $template_sent;
		}
	}
}
else 
{ 
	//bots
	header('Content-Type: text/plain; charset=utf-8');
	echo 'Nope.';
	return;
}

