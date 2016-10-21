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

if(isset($_GET['getTable'] )){
	getTable();
}

function getTable(){
	
	$mysqli = new mysqli('localhost','root','','mama');
	$jsonArray = array();
	if ($result = $mysqli->query("SELECT * FROM filing")) {

	    while($row = $result->fetch_array(MYSQL_ASSOC)) {
	            $jsonArray[] = $row;
	    }
	    
	}
	$result->close();
	$mysqli->close();
	
	echo json_encode($jsonArray);
}


?>


