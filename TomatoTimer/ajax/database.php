<?php
    $server = "127.0.0.1";
    $username = "root";
    $password = "";
    $db = "tomato";
    $con = mysqli_connect($server,$username,$password,$db);
    if(!$con){
        die(mysqli_connect_error());
    }
