<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'contact@enjaz.app';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  // Sanitize and validate inputs
  $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
  $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
  $subject = filter_var(trim($_POST['subject']), FILTER_SANITIZE_STRING);
  $message = htmlspecialchars(trim($_POST['message']));

  if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($subject) || empty($message)) {
    // Handle validation errors
    // You can create a more specific error message if you want
    die('Please fill all the fields and provide a valid email address.');
  }

  $contact->to = $receiving_email_address;
  $contact->from_name = $name;
  $contact->from_email = $email;
  $contact->subject = $subject;




  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

  $contact->add_message( $name, 'From');
  $contact->add_message( $email, 'Email');
  isset($_POST['phone']) && $contact->add_message($_POST['phone'], 'Phone');
  $contact->add_message( $message, 'Message', 10);

  echo $contact->send();
?>
