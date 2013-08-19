<?php

$mysql_user = '';
$mysql_pass = '';
$mysql_db   = '';

if(!$_GET['key'] && !$_GET['data']){ exit(); } // Just to avoid spurious connections
$con = new mysqli('localhost',$mysql_user,$mysql_pass,$mysql_db);
if ($mysqli->connect_errno) {
    $response = array('success' => False, 'error' => '$con->connect_error');
    echo json_encode($response);
    exit();
}
if($_GET['data']){
	if($_GET['key']){
		$key = $_GET['key'];
	}else{
		$key = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 5)), 0, 5);
	}
	$safe_key  = $con->real_escape_string($key);
	$safe_data = $con->real_escape_string($_GET['data']);
	$sql = 'REPLACE INTO `warp_data` (`id`,`data`) VALUES ("'. $safe_key .'","'. $safe_data .'")';
	if($con->query($sql)){
		$response = array('success' => True, 'key' => $safe_key);
	}else{
		$response = array('success' => False, 'error' => '$con->error');
	}
}else if($_GET['key']){
	$safe_key  = $con->real_escape_string($_GET['key']);
	$sql = 'SELECT `data` FROM `warp_data` WHERE id="'. $safe_key .'"';
	if($result = $con->query($sql)){
		$data = $result->fetch_assoc();
		$response = array('success' => True, 'data' => $data['data']);
	}else{
		$response = array('success' => False, 'error' => '$con->error');
	}
}
echo json_encode($response);
?>
