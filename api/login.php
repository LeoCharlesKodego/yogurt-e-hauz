<?php

include_once("config.php");
include_once("constant.php");


define("TABLE_NAME", "admin");

if (isset($_POST['auth']))
{
    $loginCredentials = json_decode($_POST["auth"]); 

    $response = array(
        "code" => INPUT_ERROR,
        "description" => "Wrong username password"
    );

   
    $admins = $database->get(TABLE_NAME);

    foreach ($admins as $admin) {
        if ($admin["username"] === $loginCredentials->username) {
            if (password_verify($loginCredentials->password, $admin["password"])) {
                $response["code"] = SUCCESS;
                $response["description"] = "Successfully Login";

                $_SESSION["loggedin-user"] = $loginCredentials->username;
            }
        }
    }

    echo json_encode($response);
}
?>