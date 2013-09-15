<?php
	$id = ""; if (!empty($_REQUEST["id"])) { $id = substr($_REQUEST["id"], 3, 2); }
	$y = ""; if (!empty($_REQUEST["y"])) { $y = $_REQUEST["y"]; }

	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	echo "<jqm_theme xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"../../xsd/jqm_theme.xsd\" 
		id=\"us\" shapesUrl=\"../../../maps/us/states/fm-us_" . $id . ".xml\" backgroundImageUrl=\"../../../maps/us/states/fm-us_" . $id . ".png\" 
		reloadInterval=\"\" reloadFeatures=\"false\" reloadFeatureCategories=\"false\" reloadMarkers=\"false\" reloadMarkerCategories=\"false\" 
		featuresUrl=\"feature_counties.php?id=" . $id . "&amp;y=" . $y . "\" featureCategoriesUrl=\"feature_categories.php?l=2\" 
		markersUrl=\"marker_counties.php?id=" . $id . "\" markerCategoriesUrl=\"marker_categories.php\">";
	echo "<platformFunctionality id=\"default\" calculatedMapAreas=\"false\" onMouseOverCalculateInterval=\"\" displayPolygons=\"true\" />";
	echo "</jqm_theme>";
?>