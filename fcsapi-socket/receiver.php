<?php

// latest prices received
function fcs_data_received($data){
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "db_trading_platform_v2";

	global $conn;
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
	// echo "\n  -------------- NEW ------------  : ".$data['s']. " \n";
  // print_r(($data));

	if(array_key_exists("v", $data)){
		$vol = $data['v'];
	}else{
		$vol = 0;
	}

	$update_sql = "UPDATE currency_lists set `ask` = '".$data['a']."', `bid` = '".$data['b']."', `open` = '".$data['lc']."', `high` = '".$data['h']."', `low` = '".$data['l']."', `close` = '".$data['c']."', `spread` = '".$data['sp']."', `change` = '".$data['ch']."', `change_per` = '".$data['cp']."', `time` = '".$data['t']."', `volume` = '".$vol."' WHERE `id` = ".$data['id'].";";

	if ($conn->query($update_sql) === TRUE) {
	  echo $data['s']." Updated successfully \n";
	} else {
	  echo "Error: " . $update_sql . "<br>" . $conn->error."\n";
	}
}

// socket successfull connect  message
function fcs_successfully($data){
    echo "\n fcs_successfully : ";
    print_r($data);
}

// log message from server
function fcs_message($data){
	echo "\n fcs_message : ";
    print_r($data);
}

// message, when disconnect from server
function fcs_disconnect($data){
    echo "\n fcs_disconnect : ";
    print_r($data);
}
