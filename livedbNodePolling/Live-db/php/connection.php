<?php 
//////// 
// 
// Get Data Server
// @getTable:: The method arg
// @return::   Returns a json result from
//             the database 'filing' table
//
//Author: Christopher Stenqvist, Many Ndao
//Date:   10/21/2016
// 
//////// 
//Returns a connection object for query
function getConnection(){
	$s    = 'localhost';
	$user = 'root';
	$pass = '';
	$db   = 'mama'; 

	$dbh  = new PDO("mysql:host=$s;dbname=$db",$user, $pass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

//Closes the connection obj
function closeMySql(){
	global $mysql_connection;
	if($mysql_connection != false)
		mysqli_close($mysql_connection);
	$mysql_connection = false;
}

?>


