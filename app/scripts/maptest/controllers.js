'use strict';

/* Controllers */

function rootController($scope, $timeout, unemploymentDataService, mapDataService) {
	
	/**************************
	testing for level-4 data (unemploymentDataService)
	***************************/
	
	// $scope.monthsBetween = function(d1, d2) {
	// 	return unemploymentDataService.calculateMonthsBetween(d1, d2);
	// }
	
	// $scope.unemployment = unemploymentDataService.unemployment;
	// $scope.data1 = unemploymentDataService.getData('1990-01-01', '1990-06-01', 0);
	// $scope.$watch('unemployment.values', function() {
	// 	$scope.data1 = unemploymentDataService.getData('1990-01-01', '1990-06-01', 0);
	// });

	// $scope.labor_force = unemploymentDataService.labor_force;
	// $scope.data2 = unemploymentDataService.getLaborData('1990-01-01', '1990-06-01', 0);
	// $scope.$watch('labor_force.values', function() {
	// 	$scope.data2 = unemploymentDataService.getLaborData('1990-01-01', '1990-06-01', 0);
	// });
	
	/**************************
	testing for level-3 data (mapDataService)
	***************************/
	$scope.dataSelector = {};
	$scope.dataSelector.year = '2000';
	$scope.dataSelector.month = '01';
	$scope.years = [];
	$scope.months = [];
	for (var y=2000; y<=2013; y++) {$scope.years.push(y)};
	for (var m=1; m<=12; m++) {$scope.months.push(m)};
	
	$scope.dataSelector.regionName = "United States";
	
	$scope.subRegionData = 'Waiting';
	
	$scope.regions = ['United States'];
	$scope.countyList = [];
	$scope.dataSelector.county1 = '';
	$scope.dataSelector.county2 = '';
	
	$scope.dataForCounty = function(countyName) {
		for (var i=0; i<$scope.subRegionData.length; i++) {
			if ($scope.subRegionData[i].name==countyName) {
				return $scope.subRegionData[i].value;
			}
		}
	}
	
	$scope.updateData = function(regionChanged) {
		mapDataService.getRegionalDataForDate($scope.dataSelector.regionName, $scope.dataSelector.year+'-'+$scope.dataSelector.month+'-01', function(data) {
			$scope.usValue = data.us.value;
			$scope.dataSelector.regionName = data.region.name;
			$scope.regionValue = data.region.value;
			$scope.subRegionData = data.subRegions;
			if ($scope.dataSelector.regionName=='United States') {
				$scope.regions = ['United States'].concat(data.subRegionNames);
				$scope.subRegionType = 'States';
			} else if (regionChanged) {
				$scope.subRegionType = 'Counties';
				$scope.countyList = data.subRegionNames;
				$scope.dataSelector.county1 = '';
				$scope.dataSelector.county2 = '';
			}
			if ($scope.dataSelector.county1!='') {
				$scope.county1Value = $scope.dataForCounty($scope.dataSelector.county1);
				console.log($scope.county1Value);
			}
			if ($scope.dataSelector.county2!='') {
				$scope.county2Value = $scope.dataForCounty($scope.dataSelector.county2);
			}
	});
	};
	
	$scope.$watch('dataSelector.regionName', function() {
		$scope.updateData(true);
		console.log("$scope.updateData(true);");
		});
	
	$scope.$watch('dataSelector.year+"-"+dataSelector.month', function() {
		$scope.updateData(false);
		console.log("$scope.updateData(true);");
		});
		
	// tools for charting the data...
	$scope.usChartData = [];
	$scope.stateChartData = [];
	$scope.county1ChartData = [];
	$scope.county2ChartData = [];
	
	$scope.$watch('dataSelector.county1+" "+dataSelector.county2', function() {
		if ($scope.dataSelector.county1!='') {
			$scope.county1Value = $scope.dataForCounty($scope.dataSelector.county1);
			console.log($scope.county1Value);
		}
		if ($scope.dataSelector.county2!='') {
			$scope.county2Value = $scope.dataForCounty($scope.dataSelector.county2);
		}
		if ($scope.dataSelector.county1=='' || $scope.dataSelector.county2=='') {
			$scope.usChartData = [];
			$scope.stateChartData = [];
			$scope.county1ChartData = [];
			$scope.county2ChartData = [];
		} else {
			mapDataService.getChartableData($scope.dataSelector.regionName, $scope.dataSelector.county1, $scope.dataSelector.county2, function(result) {
				$scope.usChartData = result.us;
				$scope.stateChartData = result.state;
				$scope.county1ChartData = result.county1;
				$scope.county2ChartData = result.county2;
			});
		}
	});
	
}
rootController.$inject = ['$scope', '$timeout', 'unemploymentDataService', 'mapDataService'];