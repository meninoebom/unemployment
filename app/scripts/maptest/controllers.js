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
	$scope.dataSpec = {};
	$scope.dataSpec.year = '2000';
	$scope.dataSpec.month = '01';
	$scope.years = [];
	$scope.months = [];
	for (var y=2000; y<=2013; y++) {$scope.years.push(y)};
	for (var m=1; m<=12; m++) {$scope.months.push(m)};
	
	$scope.dataSpec.regionName = "United States";
	
	$scope.dataSpec.subRegionData = 'Waiting';
	
	$scope.regions = ['United States'];
	$scope.countyList = [];
	$scope.dataSpec.county1 = '';
	$scope.dataSpec.county2 = '';
	
	$scope.dataForCounty = function(countyName) {
		for (var i=0; i<$scope.dataSpec.subRegionData.length; i++) {
			if ($scope.dataSpec.subRegionData[i].name==countyName) {
				return $scope.dataSpec.subRegionData[i].value;
			}
		}
	}
	
	$scope.updateData = function(regionChanged) {
		mapDataService.getRegionalDataForDate($scope.dataSpec.regionName, $scope.dataSpec.year+'-'+$scope.dataSpec.month+'-01', function(data) {
			$scope.usValue = data.us.value;
			$scope.dataSpec.regionName = data.region.name;
			$scope.regionValue = data.region.value;
			$scope.dataSpec.subRegionData = data.subRegions;
			if ($scope.dataSpec.regionName=='United States') {
				$scope.regions = ['United States'].concat(data.subRegionNames);
				$scope.subRegionType = 'States';
			} else if (regionChanged) {
				$scope.subRegionType = 'Counties';
				$scope.countyList = data.subRegionNames;
				$scope.dataSpec.county1 = '';
				$scope.dataSpec.county2 = '';
			}
			if ($scope.dataSpec.county1!='') {
				$scope.county1Value = $scope.dataForCounty($scope.dataSpec.county1);
				console.log($scope.county1Value);
			}
			if ($scope.dataSpec.county2!='') {
				$scope.county2Value = $scope.dataForCounty($scope.dataSpec.county2);
			}
	});
	};
	
	$scope.$watch('dataSpec.regionName', function() {
		$scope.updateData(true);
		console.log("$scope.updateData(true);");
		});
	
	$scope.$watch('dataSpec.year+"-"+dataSpec.month', function() {
		$scope.updateData(false);
		console.log("$scope.updateData(true);");
		});
		
	// tools for charting the data...
	$scope.usChartData = [];
	$scope.stateChartData = [];
	$scope.county1ChartData = [];
	$scope.county2ChartData = [];
	
	$scope.$watch('dataSpec.county1+" "+dataSpec.county2', function() {
		if ($scope.dataSpec.county1!='') {
			$scope.county1Value = $scope.dataForCounty($scope.dataSpec.county1);
			console.log($scope.county1Value);
		}
		if ($scope.dataSpec.county2!='') {
			$scope.county2Value = $scope.dataForCounty($scope.dataSpec.county2);
		}
		if ($scope.dataSpec.county1=='' || $scope.dataSpec.county2=='') {
			$scope.usChartData = [];
			$scope.stateChartData = [];
			$scope.county1ChartData = [];
			$scope.county2ChartData = [];
		} else {
			mapDataService.getChartableData($scope.dataSpec.regionName, $scope.dataSpec.county1, $scope.dataSpec.county2, function(result) {
				$scope.usChartData = result.us;
				$scope.stateChartData = result.state;
				$scope.county1ChartData = result.county1;
				$scope.county2ChartData = result.county2;
			});
		}
	});
	
}
rootController.$inject = ['$scope', '$timeout', 'unemploymentDataService', 'mapDataService'];