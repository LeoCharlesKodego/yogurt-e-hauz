<?php
include_once("login.php");
include_once("constant.php");

if (isset($_POST['getAuthUser'])) {
    $loggedInUser = @$_SESSION["loggedin-user"];

    $response = array(
        "code" => INPUT_ERROR,
        "description" => "Logged In User Not Found",
        "details" => null
    );

    foreach($admins as $admin) {
        if ($user["username"] === $loggedInUser) {
            $response["code"] = SUCCESS;
            $response["description"] = "Succesfull";
            $response["details"] = $admin;
        }
    }

    echo json_encode($response);
}