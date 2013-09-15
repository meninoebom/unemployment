<?php
	header("Content-Type: application/xml; charset=utf-8");
	echo "<jqm_features xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"../../xsd/jqm_features.xsd\">\n";
	
	include("..\..\..\libs\jqmDB.php");

	$id = ""; if (!empty($_REQUEST["id"])) { $id = $_REQUEST["id"]; }		//STATE
	$y = "2010"; if (!empty($_REQUEST["y"])) { $y = $_REQUEST["y"]; }		//POPULATION YEAR
	$ranges = array();
	
	$sql = "SELECT r.rangeID, r.range_min, r.range_max FROM maps_ranges r WHERE r.mapID = 'uscounties' AND r.levelID = 2 ORDER BY r.rangeID ";
	$query = $jqm_db->query($sql);
	
	if (mysqli_num_rows($query) > 0)
		while ($rd = $query->fetch_assoc()) 
			array_push($ranges, array("id" => $rd['rangeID'], "min" => $rd['range_min'], "max" => $rd['range_max']));
	$query->close();

	//**************
	//*** COUNTIES ***	
	//**************
	$sql = "SELECT c.countryID, c.stateID, c.countyID, c.county, c.population_" . $y . " AS total ";
	$sql .= "FROM jqm_counties c WHERE c.stateID = '" . $id . "' ORDER BY c.countyID";
	$query = $jqm_db->query($sql);

	if (mysqli_num_rows($query) > 0)
		while ($rd = $query->fetch_assoc()) {

			$category = "";
			for ($i = 0; $i < count($ranges); $i++) {
				if (($rd['total'] >= $ranges[$i]["min"]) && ($rd['total'] < $ranges[$i]["max"])) {
					$category = $ranges[$i]["id"];
				} elseif ($rd['total'] >= $ranges[$i]["min"] && $ranges[$i]["min"] > 0 && $ranges[$i]["max"] == 0) {
					$category = $ranges[$i]["id"];					
				}
			}

			echo "<feature id=\"" . strtolower($rd['countryID'] . "_" . $rd['stateID'] . "_" . $rd['countyID']) . "\" category=\"county_" . $category . "\" label=\"" . htmlentities($rd['county']) . "\" popup=\"" . $y . " Population: " . number_format($rd['total'], 0) . "\" y=\"" . $y . "\" map=\"uscounties\" />\n";
		}
	$query->close();
	$jqm_db->close();

	echo "</jqm_features>";
?>