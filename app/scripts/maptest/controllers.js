'use strict';

/* Controllers */

function rootController($scope, $timeout, unemploymentDataService, mapDataService) {
	
	/**************************
	testing for level-4 data (unemploymentDataService)
	***************************/
	
	$scope.monthsBetween = function(d1, d2) {
		return unemploymentDataService.calculateMonthsBetween(d1, d2);
	}
	
	$scope.unemployment = unemploymentDataService.unemployment;
	$scope.data1 = unemploymentDataService.getData('1990-01-01', '1990-06-01', 0);
	$scope.$watch('unemployment.values', function() {
		$scope.data1 = unemploymentDataService.getData('1990-01-01', '1990-06-01', 0);
	});

	$scope.labor_force = unemploymentDataService.labor_force;
	$scope.data2 = unemploymentDataService.getLaborData('1990-01-01', '1990-06-01', 0);
	$scope.$watch('labor_force.values', function() {
		$scope.data2 = unemploymentDataService.getLaborData('1990-01-01', '1990-06-01', 0);
	});
	
	/**************************
	testing for level-3 data (mapDataService)
	***************************/
	
	$scope.year = '2000';
	$scope.month = '01';
	$scope.years = [];
	$scope.months = [];
	for (var y=2000; y<=2013; y++) {$scope.years.push(y)};
	for (var m=1; m<=12; m++) {$scope.months.push(m)};
	
	$scope.regionName = "United States";
	$scope.subRegionData = 'Waiting';
	
	$scope.regions = ['United States'];
	$scope.countyList = [];
	$scope.county1 = '';
	$scope.county2 = '';
	
	$scope.dataForCounty = function(countyName) {
		return _.findWhere($scope.subRegionData, {name:countyName}).value;
	}
	
	$scope.updateData = function(regionChanged) {
		mapDataService.getRegionalDataForDate($scope.regionName, $scope.year+'-'+$scope.month+'-01', function(data) {
			$scope.usValue = data.us.value;
			$scope.regionName = data.region.name;
			$scope.regionValue = data.region.value;
			$scope.subRegionData = data.subRegions;
			if ($scope.regionName=='United States') {
				$scope.regions = ['United States'].concat(data.subRegionNames);
				$scope.subRegionType = 'States';
			} else if (regionChanged) {
				$scope.subRegionType = 'Counties';
				$scope.countyList = data.subRegionNames;
				$scope.county1 = '';
				$scope.county2 = '';
			}
			if ($scope.county1!='') {
				$scope.county1Value = $scope.dataForCounty($scope.county1);
				console.log($scope.county1Value);
			}
			if ($scope.county2!='') {
				$scope.county2Value = $scope.dataForCounty($scope.county2);
			}
	});
	};
	
	$scope.$watch('regionName', function() {
		$scope.updateData(true);
		});
	
	$scope.$watch('year+"-"+month', function() {
		$scope.updateData(false);
		});
		
	// tools for charting the data...
	$scope.usChartData = [];
	$scope.stateChartData = [];
	$scope.county1ChartData = [];
	$scope.county2ChartData = [];
	
	$scope.$watch('county1+" "+county2', function() {
		if ($scope.county1!='') {
			$scope.county1Value = $scope.dataForCounty($scope.county1);
			console.log($scope.county1Value);
		}
		if ($scope.county2!='') {
			$scope.county2Value = $scope.dataForCounty($scope.county2);
		}
		if ($scope.county1=='' || $scope.county2=='') {
			$scope.usChartData = [];
			$scope.stateChartData = [];
			$scope.county1ChartData = [];
			$scope.county2ChartData = [];
		} else {
			mapDataService.getChartableData($scope.regionName, $scope.county1, $scope.county2, function(result) {
				$scope.usChartData = result.us;
				$scope.stateChartData = result.state;
				$scope.county1ChartData = result.county1;
				$scope.county2ChartData = result.county2;
			});
		}
	});
	
}
rootController.$inject = ['$scope', '$timeout', 'unemploymentDataService', 'mapDataService'];