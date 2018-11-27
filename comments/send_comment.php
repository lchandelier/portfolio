<?php
$date_format = "d/m/Y H:i:s";
$email_dest = "lena.chandelier@pm.me";
$subject = "[Blog] - Nouveau commentaire";
$template_sent = '../comment-sent.html';


if($_POST['comment_blop'] == '') {
	$msg = "post_id: " . $_POST["post_id"] . "\n";
	$msg .= "email: " . $_POST["email"] . "\n";
	$msg .= "---\n";
	$msg .= "- id: ?\n";
	$msg .= "  author: " . $_POST["name"] . "\n";
	$msg .= "  date: " . date($date_format) . "\n";
	$msg .= "  contents: \n" . $_POST["comment"];

	$headers = "From: noreply@lena-chandelier.me\n";
	$headers .= "Content-Type: text/plain; charset=utf-8";
	
	if($_POST["email"] != '') {
		
		if($_POST['language'] == 'en') {
			$template_sent = '../en/comment-sent-en.html';
		}

		// server error
		if (mail($email_dest, $subject, $msg, $headers))
		{
			include $template_sent;
		}
		else
		{
			if($_POST['language'] == 'en') {
				echo 'Your comment can\'t be sent.';
			
			}
			else {
				echo "Le commentaire n'a pas pu être envoyé.";
			}
		}
	}
	else {
		// all fields not filled
		if($_POST['language'] == 'en') {
			$template_sent = '../comment-not-sent-en.html';
			include $template_sent;
		}
		else {
			$template_sent = '../comment-not-sent.html';
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

