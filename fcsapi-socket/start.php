<?php

use Workerman\Worker;
use Workerman\Connection\AsyncTcpConnection;
use Workerman\Timer;


require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/receiver.php';
require_once __DIR__ . '/db_con.php';
require_once __DIR__ . '/api_key.php';

global $api_key,$currencyList;

$sql = "SELECT * FROM currency_lists";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $currencyList .= $row['id'].",";
  }
} else {
  echo "0 results";
}

if(empty($currencyList)){
    echo " Empty currency list ";
    die;
}

$worker = new Worker();
$worker->onWorkerStart = function() use ($api_key)
{
    start_connection();
};
Worker::runAll();

global $backup;
$backup = false;
function start_connection(){
    global $api_key,$currencyList,$backup;
    // Websocket protocol for client.
    if($backup)
        $ws_connection = new AsyncTcpConnection("ws://fxcoinapi.com/v3/?EIO=3&transport=websocket");
    else
        $ws_connection = new AsyncTcpConnection("ws://fcsapi.com/v3/?EIO=3&transport=websocket");

    // $class_methods = get_class_methods($ws_connection);
    // print_r($class_methods);

    // return domain name of connected server
    echo "Connect with " . $ws_connection->getRemoteIp()." \n";

    $ws_connection->onConnect = function($connection) use ($api_key){
        global $currencyList;
        heart_beat($connection); // initalize hear beat
        join_ids($connection); // join currency ids
        socket_ping($connection); // set ping interval
    };

    // received all response from socket, then direct to it right function.
    $ws_connection->onMessage = function($connection, $data){
        $pos    = stripos($data,"[");
        if($pos>=1){
            $data = json_decode(substr($data,$pos),true); // convert json string to array
            if(!empty($data[1])){
                $fun = $data[0];
                if(function_exists("fcs_$fun")){
                   call_user_func("fcs_$fun",$data[1]); // call target function
                }
            }
        }
        // echo $data;
    };

    // Error Message
    $ws_connection->onError = function($connection, $code, $msg){
        echo "error: $msg\n";
    };

    // Disconnect Message
    $ws_connection->onClose = function($connection){
        echo "connection closed ------------------------------------ \n";
        // $connection->connect(); // connect with same server
        die;
        // OR
        global $backup;
        $backup = !$backup;
        start_connection(); // connect with backup server
    };

    // Start Connection
    $ws_connection->connect();
}


start_connection();
#### business logic functions ####

// socket heartbeat require once every hour, if your heartbeat stop so you will disconnect
function heart_beat(&$con){
    global $api_key;
    $con->send('42["heartbeat","'.$api_key.'"]'); //send api_key
}

// connect your required Forex IDs with server
function join_ids(&$con){
    global $currencyList;
    $con->send('42["real_time_join","'.$currencyList.'"]'); //currency list
}

// set ping interval and heart beat
function socket_ping(&$con){
    if(!empty($con->timeout_timerid))
        Timer::del($con->timeout_timerid);
    if(!empty($con->fcs_heart))
        Timer::del($con->fcs_heart);

    $con->timeout_timerid = Timer::add(15, function()use (&$con){ //ping
        //echo "send ping --------------- ".date("H:i:s")." - \n";
        $con->send('2');
    });


    $con->fcs_heart = Timer::add((60*60), function()use (&$con){ //ping
        //echo "send heart beat --------------- ".date("H:i:s")." - \n";
        heart_beat($con);
    });

    // Debug: what if connection close!!! - Auto reconnect
    // Close connection after 20 seconds
    /*$con->fcs_heart = Timer::add(20, function()use (&$con){ //ping
        $con->close();
    });*/
}

// When connection when need.
$connection->close();
