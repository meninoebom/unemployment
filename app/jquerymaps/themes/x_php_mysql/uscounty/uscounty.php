<?php
	$y = ""; if (!empty($_REQUEST["y"])) { $y = $_REQUEST["y"]; }

	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
	echo "<jqm_theme xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"../xsd/jqm_theme.xsd\" 
		id=\"us\" shapesUrl=\"../../../maps/us/fm-usa_statesandcounties.xml\" backgroundImageUrl=\"../../../maps/us/fm-usa_statesandcounties.png\" 
		reloadInterval=\"\" reloadFeatures=\"false\" reloadFeatureCategories=\"false\" reloadMarkers=\"false\" reloadMarkerCategories=\"false\" 
		featuresUrl=\"feature_counties.php?y=" . $y . "\" featureCategoriesUrl=\"feature_categories.php?l=2&amp;y=" . $y . "\" 
		markersUrl=\"\" markerCategoriesUrl=\"\" minScaleFactor=\"0.6\" >";
	echo "<platformFunctionality id=\"default\" calculatedMapAreas=\"false\" onMouseOverCalculateInterval=\"\" displayPolygons=\"true\" />";
	echo "</jqm_theme>";
?>