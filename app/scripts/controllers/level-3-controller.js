'use strict';

unemploymentApp.controller('Level3Ctrl', ['$scope', '$timeout', 'mapDataService',  function($scope, $timeout, mapDataService) {
	// $scope.currentState = "Choose a State";
	// $scope.currentCounty1 = "Choose County 1";
	// $scope.currentCounty2 = "Choose County 2";
	$scope.currentStep = {val: 1};
	$scope.currentScale = {val: "nation"};
	$scope.currentView = {val: "table"};
	// $scope.usStates = [
	//     { name: 'ALABAMA', abbreviation: 'AL'},
	//     { name: 'ALASKA', abbreviation: 'AK'},
	//     { name: 'AMERICAN SAMOA', abbreviation: 'AS'},
	//     { name: 'ARIZONA', abbreviation: 'AZ'},
	//     { name: 'ARKANSAS', abbreviation: 'AR'},
	//     { name: 'CALIFORNIA', abbreviation: 'CA'},
	//     { name: 'COLORADO', abbreviation: 'CO'},
	//     { name: 'CONNECTICUT', abbreviation: 'CT'},
	//     { name: 'DELAWARE', abbreviation: 'DE'},
	//     { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
	//     { name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
	//     { name: 'FLORIDA', abbreviation: 'FL'},
	//     { name: 'GEORGIA', abbreviation: 'GA'},
	//     { name: 'GUAM', abbreviation: 'GU'},
	//     { name: 'HAWAII', abbreviation: 'HI'},
	//     { name: 'IDAHO', abbreviation: 'ID'},
	//     { name: 'ILLINOIS', abbreviation: 'IL'},
	//     { name: 'INDIANA', abbreviation: 'IN'},
	//     { name: 'IOWA', abbreviation: 'IA'},
	//     { name: 'KANSAS', abbreviation: 'KS'},
	//     { name: 'KENTUCKY', abbreviation: 'KY'},
	//     { name: 'LOUISIANA', abbreviation: 'LA'},
	//     { name: 'MAINE', abbreviation: 'ME'},
	//     { name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
	//     { name: 'MARYLAND', abbreviation: 'MD'},
	//     { name: 'MASSACHUSETTS', abbreviation: 'MA'},
	//     { name: 'MICHIGAN', abbreviation: 'MI'},
	//     { name: 'MINNESOTA', abbreviation: 'MN'},
	//     { name: 'MISSISSIPPI', abbreviation: 'MS'},
	//     { name: 'MISSOURI', abbreviation: 'MO'},
	//     { name: 'MONTANA', abbreviation: 'MT'},
	//     { name: 'NEBRASKA', abbreviation: 'NE'},
	//     { name: 'NEVADA', abbreviation: 'NV'},
	//     { name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
	//     { name: 'NEW JERSEY', abbreviation: 'NJ'},
	//     { name: 'NEW MEXICO', abbreviation: 'NM'},
	//     { name: 'NEW YORK', abbreviation: 'NY'},
	//     { name: 'NORTH CAROLINA', abbreviation: 'NC'},
	//     { name: 'NORTH DAKOTA', abbreviation: 'ND'},
	//     { name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
	//     { name: 'OHIO', abbreviation: 'OH'},
	//     { name: 'OKLAHOMA', abbreviation: 'OK'},
	//     { name: 'OREGON', abbreviation: 'OR'},
	//     { name: 'PALAU', abbreviation: 'PW'},
	//     { name: 'PENNSYLVANIA', abbreviation: 'PA'},
	//     { name: 'PUERTO RICO', abbreviation: 'PR'},
	//     { name: 'RHODE ISLAND', abbreviation: 'RI'},
	//     { name: 'SOUTH CAROLINA', abbreviation: 'SC'},
	//     { name: 'SOUTH DAKOTA', abbreviation: 'SD'},
	//     { name: 'TENNESSEE', abbreviation: 'TN'},
	//     { name: 'TEXAS', abbreviation: 'TX'},
	//     { name: 'UTAH', abbreviation: 'UT'},
	//     { name: 'VERMONT', abbreviation: 'VT'},
	//     { name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
	//     { name: 'VIRGINIA', abbreviation: 'VA'},
	//     { name: 'WASHINGTON', abbreviation: 'WA'},
	//     { name: 'WEST VIRGINIA', abbreviation: 'WV'},
	//     { name: 'WISCONSIN', abbreviation: 'WI'},
	//     { name: 'WYOMING', abbreviation: 'WY' }
	// ];
	$scope.submitResponse = function() {
		//TODO grading and feedback happen here
		$scope.currentStep.val += 1; 
		//TODO after step 4 go to level 4
	}
	$scope.setCurrentScale = function(scale) {
		$scope.currentScale.val = scale;
	}
	$scope.setCurrentView = function(view) {
		$scope.currentView.val = view;
	}
	$scope.setMonth = function(month) {
		$scope.month.val = month;
	}
	$scope.setYear = function(year) {
		$scope.year.val = year;
	}



	//$scope.year = '2000';
	$scope.year = {val: '2000'};
	//$scope.month = '01';
	$scope.month = {val: '01'};
	$scope.years = [];
	$scope.months = [];
	for (var y=2000; y<=2013; y++) {$scope.years.push(y)};
	for (var m=1; m<=12; m++) {$scope.months.push(m)};
	
	//$scope.regionName = "United States";
	$scope.regionName = {val: "United States"};
	$scope.subRegionData = 'Waiting';
	//$scope.subRegionData = {val: 'Waiting'};
	
	$scope.regions = ['United States'];
	$scope.countyList = [];
	//$scope.county1 = '';
	$scope.county1 = {val: ''};
	//$scope.county2 = '';
	$scope.county2 = {val: ''};


	// to handle some date formatting issues...
	$scope.monthNames = [
	    "January", "February", "March",
	    "April", "May", "June",
	    "July", "August", "September",
	    "October", "November", "December"
	];

	$scope.getMonthName = function(monthNum) {
		return $scope.monthNames[monthNum - 1];
	}
	
	$scope.setRegionName = function(region) {
		$scope.regionName.val = region;
	}
	
	$scope.setCounty1 = function(county) {
		$scope.county1.val = county;
	}
	
	$scope.setCounty2 = function(county) {
		$scope.county2.val = county;
	}

	$scope.dataForCounty = function(countyName) {
		for (var i=0; i<$scope.subRegionData.length; i++) {
			if ($scope.subRegionData[i].name==countyName) {
				return $scope.subRegionData[i].value;
			}
		}
	}
	
	$scope.updateData = function(regionChanged) {
		mapDataService.getRegionalDataForDate($scope.regionName.val, $scope.year.val+'-'+$scope.month.val+'-01', function(data) {
			$scope.usValue = data.us.value;
			$scope.regionName.val = data.region.name;
			$scope.regionValue = data.region.value;
			$scope.subRegionData = data.subRegions;
			if ($scope.regionName.val=='United States') {
				$scope.regions = ['United States'].concat(data.subRegionNames);
				$scope.subRegionType = 'States';
			} else if (regionChanged) {
				$scope.subRegionType = 'Counties';
				$scope.countyList = data.subRegionNames;
				$scope.county1.val = '';
				$scope.county2.val = '';
			}
			if ($scope.county1.val!='') {
				$scope.county1Value = $scope.dataForCounty($scope.county1.val);
			}
			if ($scope.county2.val!='') {
				$scope.county2Value = $scope.dataForCounty($scope.county2.val);
			}
	});
	};
	
	$scope.$watch('regionName.val', function() {
		$scope.updateData(true);
		});
	
	$scope.$watch('year.val+"-"+month.val', function() {
		$scope.updateData(false);
		});
		
	// tools for charting the data...
	$scope.usChartData = [];
	$scope.stateChartData = [];
	$scope.county1ChartData = [];
	$scope.county2ChartData = [];
	
	$scope.$watch('county1.val+" "+county2.val', function() {
		if ($scope.county1.val!='') {
			$scope.county1Value = $scope.dataForCounty($scope.county1.val);
		}
		if ($scope.county2.val!='') {
			$scope.county2Value = $scope.dataForCounty($scope.county2.val);
		}
		if ($scope.county1.val=='' || $scope.county2.val=='') {
			$scope.usChartData = [];
			$scope.stateChartData = [];
			$scope.county1ChartData = [];
			$scope.county2ChartData = [];
		} else {
			mapDataService.getChartableData($scope.regionName, $scope.county1.val, $scope.county2.val, function(result) {
				$scope.usChartData = result.us;
				console.log("usChartData = "+$scope.usChartData);
				$scope.stateChartData = result.state;
				console.log("stateChartData = "+$scope.stateChartData);
				$scope.county1ChartData = result.county1;
				console.log("country1ChartData = "+$scope.county1ChartData);
				$scope.county2ChartData = result.county2;
				console.log("country2ChartData = "+$scope.county2ChartData);
			});
		}
	});

}]);
