
<?php
//NODE DOES NOT READ PHP
include('./connection.php');


if(isset($_POST['ac_isset']) && !empty($_POST['ac_isset'])) {
	$action = $_POST['ac_isset']
	switch($action){
		case 'g_d': getData();break;
		default: break;
	}
}

getData();

function getData(){
    //prepare sql_stmts
	$p_data_sql    = "SELECT * FROM filing;";


    try{
    	$conn = getConnection();
		
		$stmt = $conn->query($p_data_sql);
		$f_d  = $stmt->fetchAll(PDO::FETCH_OBJ);

		$conn = null;
		closeMySql();

		$filing   = json_encode($p_d);

		// $data = array(
		// 	"pricing"   => $pricing,
		// 	"terms"     => $terms,
		// 	"tiers"     => $tiers,
		// 	"captions"  => $captions,
		// 	"client_submissions" => $client_submissions
		// );


    	echo $json_response = json_encode($f_d);
    }catch(PDOException $e){
    	header('HTTP/1.1 500 Internal Server Error');
    	header('Content-Type: application/json; charset=UTF-8');
   		die(json_encode(array('message' => 'ERROR', 'code' => 1337)));
   		closeMySql();
    }
}
?>