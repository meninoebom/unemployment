<?php
	$host = "evaluation.jquerymaps.com";
	//$host = "localhost";
	
	$db   = "jqm_eval_php_mysql_uswo01";
	$user = "evaluation";
	$pass = "evaluation";
	
	$jqm_db = new mysqli($host, $user, $pass, $db);
	if ($jqm_db->connect_errno) { echo "Error MySQL: (" . $jqm_db->connect_errno . ") " . $jqm_db->connect_error; }
	
	$jqm_db->set_charset("utf8")
?>