<?php
$date_format = "d/m/Y H:i:s";
$email_dest = "mylene.chandelier@protonmail.ch";
$subject = "[Blog] - Nouveau commentaire";
$template_sent = '../comment-sent.html';

if($_POST['language'] == 'en') {
    $template_sent = '../en/comment-sent-en.html';
    $error_sent = 'Your comment can\'t be sent. Please try again.';
}

if($_POST['comment_blop'] == '') {
    $msg = "post_id: " . $_POST["post_id"] . "\n";
    $msg .= "email: " . $_POST["email"] . "\n";
    $msg .= "---\n";
    $msg .= "- id: ?\n";
    $msg .= "  author: " . $_POST["name"] . "\n";
    $msg .= "  date: " . date($date_format) . "\n";
    $msg .= "  contents: \n" . $_POST["comment"];

    $headers = "From: $email_dest\n";
    $headers .= "Content-Type: text/plain; charset=utf-8";

    if (mail($email_dest, $subject, $msg, $headers))
    {
        include $template_sent;
    }
    else
    {
        echo "Le commentaire n'a pas pu être envoyé.";
    }
}
else 
{
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Soumission refusée.';
    return;
}