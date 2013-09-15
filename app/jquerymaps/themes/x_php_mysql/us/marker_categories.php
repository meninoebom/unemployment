<?php
	header("Content-Type: application/xml; charset=utf-8");
	echo "<jqm_markerCategories xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"../../xsd/jqm_markerCategories.xsd\">";

	include("..\..\..\libs\jqmDB.php");

	$sql = "SELECT r.rangeID, r.range_icon FROM maps_ranges_cities r WHERE r.mapID = 'us' ORDER BY r.rangeID ";
	$query = $jqm_db->query($sql);
	
	if (mysqli_num_rows($query) > 0)
		while ($rd = $query->fetch_assoc()) {
			echo "<category id=\"city_" . $rd['rangeID'] . "\" enabled=\"true\" >\n";
			echo "<markerStyle event=\"onMouseOut\" iconUrl=\"../../../images/icons/" . $rd['range_icon'] . "\" scale=\"1\" opacity=\"1\" visible=\"true\" />";
			echo "<action event=\"onMouseOver\" target=\"infowindow\" infoWindowDiv=\"jqm_popup\" align=\"mouse,10,10\" />";
			echo "<action event=\"onClick\" target=\"js\" jsFunction=\"jqmMarkerPopup_us\" />";
			echo "</category>\n";
		}
	$query->close();
	$jqm_db->close();

	echo "</jqm_markerCategories>";
?>