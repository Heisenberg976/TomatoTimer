<?php
include 'database.php';
if (isset($_POST['button'])) {
    $short = $_POST['shortT'];
    $long = $_POST['longT'];
    $work = $_POST['workT'];
    $ip = $_SERVER['REMOTE_ADDR'];
    $sql = 'select * from users where ip = "' . $ip . '"';
    $result = mysqli_query($con, $sql);
    if (mysqli_num_rows($result) > 0) {
        $sql1 = "update users set workTime = " . $work . " , shortTime = " . $short . " , longTime = " . $long;
        mysqli_query($con, $sql1);
        echo $sql1;
    } else {
        $sql2 = 'insert into users (ip,workTime,shortTime,longTime)  values("' . $ip . '",' . $work . ',' . $short . ',' . $long . ')';
        mysqli_query($con, $sql2);
        echo $sql2;
    }
}
