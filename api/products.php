<?php

include_once("config.php");
include_once ("constant.php");


define("TABLE_NAME", "products");


if (isset($_GET['index']))
{

    $users = $database->get(TABLE_NAME);
    $data['records'] = $users;
    $data['total_rows'] = count($users);

    echo parseResponse(SUCCESS, "Successful", null, $data);
}


if (isset($_GET['show']))
{
   $id = $_GET['id'];
   
   $database->where("id", $id);
   $users = $database->getOne(TABLE_NAME);
   $data['records'] = $users;

   echo parseResponse(SUCCESS, "Successful", null, $data);
}

if (isset($_POST['store']))
{
    $data = json_decode($_POST['store']);

    
    $columns = array(
        "id" => $data->id,
        "product_name" => $data->product_name,
        "description" => $data->description,
        "price" => $data->price,

    );

    $id = $database->insert(TABLE_NAME, $columns);

    echo $id ? parseResponse(SUCCESS, "Succesfully Inserted", $id) : parseResponse(SERVER_ERROR, "Insert failed");
    
}


if (isset($_POST['destroy']))
{
    $id = $_POST['id'];

    $database->where("id", $id);
    $isDeleted = $database->delete(TABLE_NAME);

    echo parseResponse(SUCCESS, "Succesfully Deleted");
}



if (isset($_POST['update']))
{
   $id = $_POST['id'];
   $data = json_decode($_POST['update']);

   
   $columns = array(
        "id" => $data->id,
        "product_name" => $data->product_name,
        "description" => $data->description,
        "price" => $data->price,

    
    );

    $database->where("id", $id);
    $id = $database->update(TABLE_NAME, $columns);

    echo $id ? parseResponse(SUCCESS, "Succesfully Updated", $id) : parseResponse(SERVER_ERROR, "Update failed");
}