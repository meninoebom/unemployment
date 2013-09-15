<?php
	$y = ""; if (!empty($_REQUEST["y"])) { $y = $_REQUEST["y"]; }

	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
	echo "<jqm_theme xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"../xsd/jqm_theme.xsd\" 
		id=\"us\" shapesUrl=\"../../../maps/us/fm-us.xml\" backgroundImageUrl=\"../../../maps/us/fm-us.png\" 
		reloadInterval=\"\" reloadFeatures=\"false\" reloadFeatureCategories=\"false\" reloadMarkers=\"false\" reloadMarkerCategories=\"false\" 
		featuresUrl=\"feature_states.php?y=" . $y . "\" featureCategoriesUrl=\"feature_categories.php?l=1&amp;y=" . $y . "\" 
		markersUrl=\"marker_states.php\" markerCategoriesUrl=\"marker_categories.php\">";
	echo "<platformFunctionality id=\"default\" calculatedMapAreas=\"false\" onMouseOverCalculateInterval=\"\" displayPolygons=\"true\" />";
	echo "</jqm_theme>";
?>