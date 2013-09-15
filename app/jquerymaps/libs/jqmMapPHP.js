/*****************************/
/*** JQUERYMAPS EVALUATION ***/
/*****************************/

	/*** JQM LIBRARY ***/
	if (window.location.href.indexOf('jqmdebug') != -1)
		document.write("<script src='http://localhost/jqm/jquerymaps/libs/jquerymaps/JQueryMaps_debug.js'><\/script>");
	else
		document.write("<script src='jquerymaps/libs/jquerymaps/JQueryMaps.js'><\/script>");
		
	/*** VARIABLES ***/
	var url_path 	= "php_mysql";
	
	var url_maps 	= "maps.php";
	var url_legend 	= "legend.php";
	var url_year	= "box_year.php";
	var url_info	= "box_info.php";
	var url_tools	= "box_tools.php";
	var url_chart	= "chart.php";
	var url_city 	= "city.php";
	
	var jqmMap		= "";
	var jqmMapLoad 	= false;
	var jqmChart;
	var jqmMapZoom 	= "";
	var jqmMapZoomBack = "";
	var jqmMapLat = "";
	var jqmMapLon = "";
	var jqmMapID = "";

	var map_id 		= "";
	var map_title	= "";
	var map_level 	= 0;
	
	/*** DOCUMENT READY ***/
	$(document).ready(function() {
		$("#jqm_dialog").dialog({autoOpen: false});
		
		mapsLoad();
	});
	
	/*** MAPS - LOAD LIST OF MAPS AND CREATE MENU ***/
	function mapsLoad() {
		$.ajax({url: 'jquerymaps/info/' + url_path + "/" + url_maps, success: function(data) { $("#jqm_maps").html(data); mapsSelect($("#jqm_menu li:first a").attr("id")); } });
	}
	
	/*** MAPS - SELECT A MAP ***/
	function mapsSelect(id) {
		if (jqmMapLoad == true) { if (jqmMap.checkIfMapIsReady() == false) { return false; } }
		
		$("#jqm_menu > li > a").removeClass("select");
		$("#" + id).addClass("select");
		$("#jqm_map_title").html($("#" + id).html());
		
		map_id = id.substr(4);
		map_title = $("#" + id).html();
		
		jqmLoad();
	}
	
	/*** JQM - LOAD MAP AND SET INITIAL VALUES ***/
	function jqmLoad() {
		
		map_level = 0;
		jqmMapZoom = "";
		jqmMapZoomBack = "";
		jqmMapLat = "";
		jqmMapLon = "";
		
		$("#box_legend").html("");
		$("#box_year").html("");
		$("#box_info").html("");
		$("#box_tool").html("");
		if ($("#jqm_dialog").dialog("isOpen") === true) { $("#jqm_dialog").dialog("close"); }

		setMapBackground();
		
		var theme = "jquerymaps/themes/" + url_path + "/" + map_id + "/" + map_id + ".php";
		
		if (jqmMapLoad == false) {
			var params = { mapDivId: "map", configUrl: "jquerymaps/jqm_config.xml", initialThemeUrl: theme, width: '780', height: '400'};
			jqmMap = new JQueryMaps.Map(params);
			jqmMapLoad = true;
		} else {
			jqmMap.loadInitialTheme(theme);
		}
		
		jqmBoxToolsLoad();
	}

	// Set map's background
	function setMapBackground() {
		if (vIE() < 9) {
			$("#map").css("background", "#ffffff url(images/backgrounds/map_back_" + map_id + ".jpg) center no-repeat ");
		} else {
			$("#map").css("background", "url(images/backgrounds/map_back_" + map_id + ".jpg) center no-repeat ");
			$("#map").css("background-size", "cover");
		}
	}

	// Remove map's background
	function removeMapBackground() {
		$("#map").css("background", "none");
	}

	/*** JQM - FROM MAP ***/
	function jqmFromMap(obj) { 

		a = obj.clickedFeatures;
        if (obj.action == "zoomFinished") { jqmMapTitle(a); }
		if (obj.action == "allDataProcessed") { map_level = obj.level; jqmBoxLegendLoad(); }
		
		if (obj.action == "allDataProcessed" && map_id == "uscounties") { jqmBoxInfoLoad(); }
		
		if (obj.action == "allDataProcessed" && jqmMapZoom.length > 0) {
	        jqmMap.clickOnFeature(jqmMapZoom[0]);
	        jqmMapZoom.splice(0, 1);
	    }

		if (obj.action == "allDataProcessed" && jqmMapZoomBack.length == 0 && jqmMapZoom.length == 0 && jqmMapLat != "") {
			jqmMap.focusOnPoint({lat: jqmMapLat, lon: jqmMapLon, scale:	"5000000"});
			jqmMapLat = jqmMapLon = "";
			if (jqmMapID != "") { var a = new jqmMarker_world(jqmMapID); jqmMarkerPopup_world(a); jqmMapID = ""; } 
		}
		
		if (obj.action == "zoomFinished" && obj.level == 0 && jqmMapZoomBack.length > 0) { 
			jqmMapZoom = jqmMapZoomBack;
			jqmMapZoomBack = "";
			jqmMap.clickOnFeature(jqmMapZoom[0]);
	        jqmMapZoom.splice(0, 1); 
		}
		
		if (obj.action == "buttonClicked" && obj.button == "back") { 
			if ($("#jqm_dialog").dialog("isOpen") === true) { $("#jqm_dialog").dialog("close"); }
		}
		
		if (obj.action == "allDataProcessed" && map_id == "world") { jqmToolsMarkersRefresh_world(); }
	}
	
	/*** JQM - MAP TITLE ***/
	function jqmMapTitle(features) {

		var title = "";
		
		if (features.length > 0) { 
			for (i = features.length; i > 0; i--)
				title += " &raquo; " + features[features.length - i].label;
		}
        
		$("#jqm_map_title").html(map_title + "" + title);
	}
	
	/************************/
	/*** MAP - BOX LEGEND ***/
	/************************/
	function jqmBoxLegendLoad() {
		$.ajax({url: 'jquerymaps/info/' + url_path + "/" + map_id + "_" + url_legend, data: 'l=' + (map_level + 1), success: function(data) { $("#box_legend").html(data).show("blind");  } });
	}
	
	/*********************/
	/*** JQM BOX TOOLS ***/
	/*********************/
	function jqmBoxToolsLoad(id) {
		$("#box_tool").html("");
		$.ajax({url: 'jquerymaps/info/' + url_path + "/" + map_id + "_" + url_tools, success: function(data) { $("#box_tool").html(data).show("blind"); jqmBoxYearLoad();  } });
	}	
	
	/*********************/
	/*** JQM BOX YEAR ***/
	/*********************/
	function jqmBoxYearLoad() {
		$("#box_year").html("");
		$.ajax({url: 'jquerymaps/info/' + url_path + "/" + map_id + "_" + url_year, success: function(data) { $("#box_year").html(data).show("blind"); jqmBoxInfoLoad(); } });
	}
	
	function jqmBoxYearSelect(y) { $("#slider").slider('value', y); }	
	
	function jqmBoxYearSet(y) {
		if ($("#jqm_dialog").dialog("isOpen") === true) { $("#jqm_dialog").dialog("close"); }
		
		var theme = "jquerymaps/themes/" + url_path + "/" + map_id + "/" + map_id + ".php?y=" + y;
		jqmMap.loadInitialTheme(theme);

		jqmBoxInfoLoad();
	}
	
	/********************/
	/*** JQM BOX INFO ***/
	/********************/
	function jqmBoxInfoLoad() {
		var y = "";
		var id = "";
		
		switch(map_id) {
			case "us":
				y = $("#slider").slider("value");
				break;
			case "uscounties":
				y = $("#slider").slider("value");
				if (jqmMap.getCurrentLevel() > 0) { var a = jqmMap.getClickedFeatures(); id = a[0].id; }
				break;
			case "uscounty":
				var rp = $('[name=radio]');
			    $(rp).each(function() { if ($(this).attr('checked') == "checked") { y = $(this).attr("id"); }; });
				break;
		}

		$("#box_info").html("");
		$.ajax({url: 'jquerymaps/info/' + url_path + "/" + map_id + "_" + url_info, data: "y=" + y + "&id=" + id, success: function(data) { $("#box_info").html(data).show("blind"); } });
	}

	function jqmBoxInfoSelect(id) {
		
		switch(map_id) {
			case "us":
			case "uscounties":
				jqmMap.clickOnFeature(id);
				break;
			case "uscounty":
				jqmMap.clickOnFeature(id);
				break;
		}
	}
	
	function jqmMapInitialView() {
		if ($("#jqm_dialog").dialog("isOpen") === true) { $("#jqm_dialog").dialog("close"); }
		jqmMap.displayInitialView();
	}
	
	/********************/
	/*** US FUNCTIONS ***/
	/********************/

	function jqmToolsFeatures_us(category) { 
		if ($("#feature_" + category).hasClass("enable") == true) {
			$("#feature_icon_" + category).css("background-color","#E5E5E5");
			$("#feature_" + category).removeClass("enable");
			$("#feature_" + category).addClass("disable");
			$("#feature_" + category).html("Show " + $("#feature_" + category).attr('label'));
			jqmMap.hideFeaturesByCategory("state_" + category); 
		} else {
			$("#feature_icon_" + category).css("background-color", $("#feature_icon_" + category).attr('color'));
			$("#feature_" + category).removeClass("disable");
			$("#feature_" + category).addClass("enable");
			$("#feature_" + category).html("Hide " + $("#feature_" + category).attr('label'));
			jqmMap.showFeaturesByCategory("state_" + category); 
		}
	}
	
	function jqmToolsMarkers_us(category) { 
		if ($("#category_" + category).hasClass("enable") == true) {
			$("#category_icon_" + category).fadeTo("fast", 0.4);
			$("#category_" + category).removeClass("enable");
			$("#category_" + category).addClass("disable");
			$("#category_" + category).html("Show " + $("#category_" + category).attr('label'));
			jqmMap.hideMarkersByCategory('city_' + category); 
		} else {
			$("#category_icon_" + category).fadeTo("fast", 1);
			$("#category_" + category).removeClass("disable");
			$("#category_" + category).addClass("enable");
			$("#category_" + category).html("Hide " + $("#category_" + category).attr('label'));
			jqmMap.showMarkersByCategory('city_' + category); 
		}
		
		jqmMap.refreshMarkers();
	}
	
	function jqmMarkerShowPopup_us(id) {
		$.ajax({ url: 'jquerymaps/info/' + url_path + "/" + 'us_' + url_city, data: 'id=' + id, cache: false, success: function(data) {
			$("#jqm_dialog").dialog({autoOpen: true, modal: false, width: 300, height: 100, position: { of: "#map" }, resizable: false, show: "blind", title: "City" });
			$("#jqm_box_dialog").html(data);
		} });
	}
	
	function jqmFeaturePopup_us(obj) {
		$("#jqm_dialog").dialog({autoOpen: true, dialogClass:'box_dialog', width: 500, height: 300, position: { of: "#map" }, resizable: false, show: "blind", title: obj.label });
		$("#jqm_box_dialog").html("");
		
		$.ajax({ url: 'jquerymaps/info/' + url_path + "/" + map_id + '_' + url_chart, data: 'id=' + obj.id + '&y=' + obj.y, cache: false, success: function(point) {
			for (i = 0; i < point.length; i++) { point[i]["y"] = parseFloat(point[i]["y"]); }
			jqmFeaturePopupChart(point);
		} });
	}
	
	function jqmMarkerPopup_us(obj) {
		$("#jqm_dialog").dialog({autoOpen: true, modal: false, width: 300, height: 100, position: { of: "#map" }, resizable: false, show: "blind", title: obj.label });
		$("#jqm_box_dialog").html("<b>" + obj.label + "</b><br>" + obj.popup);
	}
	
	function jqmMarkerCenter(id, lat, lon, scale) {
		jqmMap.focusOnPoint({lat: lat, lon: lon, scale:	scale});
		jqmMarkerShowPopup_us(id);
	}	

	/*****************************/
	/*** US COUNTIES FUNCTIONS ***/
	/*****************************/	
	
	function jqmToolsFeatures_uscounties(category) { 
		if ($("#feature_" + category).hasClass("enable") == true) {
			$("#feature_icon_" + category).css("background-color","#E5E5E5");
			$("#feature_" + category).removeClass("enable");
			$("#feature_" + category).addClass("disable");
			$("#feature_" + category).html("Show " + $("#feature_" + category).attr('label'));
			jqmMap.hideFeaturesByCategory("state_" + category); 
			jqmMap.hideFeaturesByCategory("county_" + category); 
		} else {
			$("#feature_icon_" + category).css("background-color", $("#feature_icon_" + category).attr('color'));
			$("#feature_" + category).removeClass("disable");
			$("#feature_" + category).addClass("enable");
			$("#feature_" + category).html("Hide " + $("#feature_" + category).attr('label'));
			jqmMap.showFeaturesByCategory("state_" + category); 
			jqmMap.showFeaturesByCategory("county_" + category); 
		}
	}
	
	function jqmToolsMarkers_uscounties(category) { 
		if ($("#category_" + category).hasClass("enable") == true) {
			$("#category_icon_" + category).fadeTo("fast", 0.4);
			$("#category_" + category).removeClass("enable");
			$("#category_" + category).addClass("disable");
			$("#category_" + category).html("Show " + $("#category_" + category).attr('label'));
			jqmMap.hideMarkersByCategory('city_' + category); 
		} else {
			$("#category_icon_" + category).fadeTo("fast", 1);
			$("#category_" + category).removeClass("disable");
			$("#category_" + category).addClass("enable");
			$("#category_" + category).html("Hide " + $("#category_" + category).attr('label'));
			jqmMap.showMarkersByCategory('city_' + category); 
		}
		
		jqmMap.refreshMarkers();
	}
	
	function jqmMarkerShowPopup_uscounties(id) {
		$.ajax({ url: 'jquerymaps/info/' + url_path + "/" + 'us_' + url_city, data: 'id=' + id, cache: false, success: function(data) {
			$("#jqm_dialog").dialog({autoOpen: true, modal: false, width: 300, height: 100, position: { of: "#map" }, resizable: false, show: "blind", title: "City" });
			$("#jqm_box_dialog").html(data);
		} });
	}
	
	function jqmZoomIn_uscounties(id) {
		if ($("#jqm_dialog").dialog("isOpen") === true) { $("#jqm_dialog").dialog("close"); }
		
		if (jqmMap.getCurrentLevel() == 0) {
			jqmMapZoom = id.split(",");
			jqmMap.clickOnFeature(jqmMapZoom[0]);
			jqmMapZoom.splice(0, 1);
		} else {
			jqmMapZoomBack = id.split(",");
			jqmMap.displayInitialView();
		}
	}
	
	function jqmFeaturePopup_uscounties(obj) {
		$("#jqm_dialog").dialog({autoOpen: true, dialogClass:'box_dialog', width: 500, height: 300, position: { of: "#map" }, resizable: false, show: "blind", title: obj.label });
		$("#jqm_box_dialog").html("");
		
		$.ajax({ url: 'jquerymaps/info/' + url_path + "/" + map_id + '_' + url_chart, data: 'id=' + obj.id + '&y=' + obj.y, cache: false, success: function(point) {
			for (i = 0; i < point.length; i++) { point[i]["y"] = parseFloat(point[i]["y"]); }
			jqmFeaturePopupChart(point);
		} });
	}	
	
	/***************************/
	/*** US COUNTY FUNCTIONS ***/
	/***************************/	
	
	function jqmToolsFeatures_uscounty(category) { 
		if ($("#feature_" + category).hasClass("enable") == true) {
			$("#feature_icon_" + category).css("background-color","#E5E5E5");
			$("#feature_" + category).removeClass("enable");
			$("#feature_" + category).addClass("disable");
			$("#feature_" + category).html("Show " + $("#feature_" + category).attr('label') + "s");
			jqmMap.hideFeaturesByCategory("county_" + category); 
		} else {
			$("#feature_icon_" + category).css("background-color", $("#feature_icon_" + category).attr('color'));
			$("#feature_" + category).removeClass("disable");
			$("#feature_" + category).addClass("enable");
			$("#feature_" + category).html("Hide " + $("#feature_" + category).attr('label') + "s");
			jqmMap.showFeaturesByCategory("county_" + category); 
		}
	}

	function jqmToolsFeatures_uscounty_state() { 
		if ($("#feature_state").hasClass("enable") == true) {
			$("#feature_state").removeClass("enable");
			$("#feature_state").html("Show State Borders");
			jqmMap.hideFeaturesByCategory("state"); 
		} else {
			$("#feature_state").addClass("enable");
			$("#feature_state").html("Hide State Borders");
			jqmMap.showFeaturesByCategory("state"); 
		}
	}

	
	function jqmZoomIn_uscounty(id) {
		if (jqmMap.getCurrentLevel() == 0) {
			jqmMap.clickOnFeature(id);
		} else {
			jqmMapZoomBack = id;
			jqmMap.displayInitialView();
		}
	}
	
	function jqmFeaturePopup_uscounty(obj) {
		$.ajax({url: 'jquerymaps/info/' + url_path + "/" + map_id + '_' + url_chart, data: 'id=' + obj.id + '&y=' + obj.y, success: function(data) {
			$("#jqm_box_dialog").html(data);
			$("#jqm_dialog").dialog({autoOpen: true, dialogClass:'box_dialog', width: 300, height: 200, position: { of: "#map" }, resizable: false, show: "blind", title: obj.label });
		} });
	}
	
	/***********************/
	/*** WORLD FUNCTIONS ***/
	/***********************/
	
	function jqmToolsMarkers_world(category) { 
		if ($("#category_" + category).hasClass("enable") == true) {
			$("#category_icon_" + category).fadeTo("fast", 0.4);
			$("#category_" + category).removeClass("enable");
			$("#category_" + category).html("Show " + $("#category_" + category).attr('label'));
			jqmMap.hideMarkersByCategory(category); 
		} else {
			$("#category_icon_" + category).fadeTo("fast", 1);
			$("#category_" + category).addClass("enable");
			$("#category_" + category).html("Hide " + $("#category_" + category).attr('label'));
			jqmMap.showMarkersByCategory(category); 
		}
		
		jqmMap.refreshMarkers();
	}
	
	function jqmToolsZoomIn_world(id) {
		if ($("#jqm_dialog").dialog("isOpen") === true) { $("#jqm_dialog").dialog("close"); }
		if (jqmMap.getCurrentLevel() == 0) {
			jqmMapZoom = id.split(",");
			jqmMap.clickOnFeature(jqmMapZoom[0]);
			jqmMapZoom.splice(0, 1);
		} else {
			jqmMapZoomBack = id.split(",");
			jqmMap.displayInitialView();
		}
	}
	
	function jqmZoomIn_world(id, airport, lat, lon) {
		jqmMapLat = lat;
		jqmMapLon = lon;
		jqmMapID = airport;
		if (jqmMap.getCurrentLevel() == 0) {
			jqmMapZoom = id.split(",");
			jqmMap.clickOnFeature(jqmMapZoom[0]);
			jqmMapZoom.splice(0, 1);
		} else {
			jqmMapZoomBack = id.split(",");
			jqmMap.displayInitialView();
		}
	}
	
	function jqmMarkerPopup_world(obj) {
		$.ajax({url: 'jquerymaps/info/' + url_path + "/" + map_id + '_' + url_city, data: 'id=' + obj.id, success: function(data) {
			$("#jqm_box_dialog").html(data);
			$("#jqm_dialog").dialog({autoOpen: true, width: 400, height: 180, position: { of: "#map" }, resizable: false, show: "blind", title: obj.label });
		} });
	}
	
	function jqmMarker_world(id) {
		this.id = id;
	}
	
	function jqmToolsMarkersRefresh_world() {
		if ($("#category_airport").hasClass("enable") == true) {
			jqmMap.showMarkersByCategory("airport"); 
		} else {
			jqmMap.hideMarkersByCategory("airport"); 
		}

		if ($("#category_airport_main").hasClass("enable") == true) {
			jqmMap.showMarkersByCategory("airport_main"); 
		} else {
			jqmMap.hideMarkersByCategory("airport_main"); 
		}
		
		jqmMap.refreshMarkers();
	}
	
	
	/*************************/
	/*** JQM MAP FUNCTIONS ***/
	/*************************/
	
	function jqmScaleFeature(id, scale) {
		
		jqmMap.hideMarkersByCategory("*"); 
		jqmMap.refreshMarkers();		
	
		jqmMap.scaleFeature(id, scale);
	}
	
	function jqmUnscaleFeatures() {
		
		jqmMap.showMarkersByCategory("*"); 
		jqmMap.refreshMarkers();		
		
		jqmMap.unscaleFeatures();
		jqmMap.redraw();
	}
	
	function jqmFeaturePopupChart(data) {
		chart = new Highcharts.Chart({
			chart: { renderTo: 'jqm_box_dialog', type: 'bar', plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, width: 450, height: 240, spacingTop: 0, spacingBottom: 0, spacingRight: 0, spacingLeft: 0 },
			credits: { enabled: false },
			title: { text: null },
			xAxis: { categories: ['2010', '2000', '1990', '1980', '1970'], title: { text: null}},
			yAxis: { min: 0, title: { text: 'Population', align: 'high' }, labels: { overflow: 'justify'} },
			subtitle: { text: null },
			legend: { enabled: false }, 
			tooltip: { formatter: function() { return '' + this.key +' Population: '+ this.point.label; } },
			plotOptions: { bar: { allowPointSelect: false, cursor: 'pointer', dataLabels: { enabled: false }} },
			series: [{ name: '', data: data }]
		});
	}

	/*****************/
	/*** JQM UTILS ***/
	/*****************/
	function boxToogle(id) { 
		if ($("#" + id).is(":visible") == false) {
			$("#" + id + "_icon").removeClass("more").addClass("less");
		} else {
			$("#" + id + "_icon").removeClass("less").addClass("more");
		}
		$("#" + id).slideToggle("fast"); 
	}

	function jqmBackground() {
		if ($("#f_back").hasClass("enable") == true) {
			$("#f_back").removeClass("enable");
			$("#f_back").addClass("disable");
			removeMapBackground();
		} else {
			$("#f_back").removeClass("disable");
			$("#f_back").addClass("enable");
			setMapBackground();
		}
	}
	
	function vIE(){return (navigator.appName=='Microsoft Internet Explorer')?parseFloat((new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")).exec(navigator.userAgent)[1]):-1;}
