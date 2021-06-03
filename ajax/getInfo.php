<?php
include 'database.php';
$ip = $_SERVER['REMOTE_ADDR'];
$sql = 'select * from users where ip = "' . $ip . '"';
$result = mysqli_query($con, $sql);
while ($res  = mysqli_fetch_array($result)) {
    // echo $res['workTime'] . "\n";
    // echo $res['shortTime'] . "\n";
    // echo $res['longTime'] . "\n";
    echo $res['workTime'] . ',' . $res['shortTime'] . ','. $res['longTime'] ;
}
