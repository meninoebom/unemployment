'use strict';

unemploymentApp.controller('Level3Ctrl', ['$scope','$state', '$timeout', 'mapDataService',  function($scope, $state ,$timeout, mapDataService) {

	$scope.dataSpec = {};
	$scope.dataSpec.currentStep = 1;
	$scope.dataSpec.usValue = 0;
	$scope.dataSpec.scale = "nation";
	$scope.dataSpec.view = "graph";
	$scope.dataSpec.feedbackMessage = '';
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

	// to handle some date formatting issues...
	$scope.monthNames = [
	    "January", "February", "March",
	    "April", "May", "June",
	    "July", "August", "September",
	    "October", "November", "December"
	];

	$scope.submitResponse = function() {
		//TODO grading and feedback happen here
		console.log("booyah");
		switch ($scope.dataSpec.currentStep) {
			case 1:
				if (!$("input[name=firstQuestion]:checked").val()) {
					$scope.showFeedbackMessage('Choose an answer the before clicking next.');
					return;
				} else {
					$scope.dataSpec.currentStep += 1; 
				}
				break;
			case 2:
				if ($scope.dataSpec.regionName == 'United States') {
					$scope.showFeedbackMessage('You must choose a state before going to the next step.');
					return;
				} else {
					$scope.dataSpec.currentStep += 1; 
				}
				break;
			case 3:
				if ($scope.dataSpec.county1 == '' || $scope.dataSpec.county2 == '') {
					$scope.showFeedbackMessage('You must choose two counties before going to the next step.');
					return;
				} else {
					$scope.dataSpec.currentStep += 1; 
				}
				break;	
			case 4:
				if (!$("input[name=lastQuestion]:checked").val()) {
					$scope.showFeedbackMessage('Choose an answer the before clicking next.');
					return;
				} else {
					$state.transitionTo('level-4-intro'); 
				}
				break;			
			default:
				$scope.dataSpec.currentStep += 1; 
		}
		//TODO after step 4 go to level 4
	}

	$scope.showFeedbackMessage = function(message) {
		$scope.dataSpec.feedbackMessage = message;
		angular.element('#incorrect-modal').modal('show');
	}

	$scope.setDataScale = function(scale) {
		$scope.dataSpec.scale = scale;
	}

	$scope.setDataView = function(view) {
		$scope.dataSpec.view = view;
	}

	$scope.setMonth = function(month) {
		$scope.dataSpec.month = month;
	}

	$scope.setYear = function(year) {
		$scope.dataSpec.year = year;
	}

	$scope.prevMonth = function() {
		if($scope.dataSpec.month === 1) {
			$scope.dataSpec.month = 12;
			$scope.prevYear();
		} else {
			$scope.dataSpec.month -=1;
		}
	}

	$scope.nextMonth = function() {
		if($scope.dataSpec.month === 12) {
			$scope.dataSpec.month = 1;
			$scope.nextYear();
		} else {
			$scope.dataSpec.month +=1;
		}
	}

	$scope.prevYear = function() {
		if($scope.dataSpec.year === 2000) {
			$scope.dataSpec.year = 2013;
		} else {
			$scope.dataSpec.year -=1;
		}
	}

	$scope.nextYear = function() {
		if($scope.dataSpec.year === 2013) {
			$scope.dataSpec.year = 2000;
		} else {
			$scope.dataSpec.year +=1;
		}
	}

	$scope.getMonthName = function(monthNum) {
		return $scope.monthNames[monthNum - 1];
	}
	
	$scope.setRegionName = function(region) {
		$scope.dataSpec.regionName = region;
	}
	
	$scope.setCounty1 = function(county) {
		$scope.dataSpec.county1 = county;
	}
	
	$scope.setCounty2 = function(county) {
		$scope.dataSpec.county2 = county;
	}

	$scope.selectSubRegion = function(region) {
		if (region === $scope.dataSpec.county1 || region === $scope.dataSpec.county2) return;
		if ($scope.dataSpec.regionName === 'United States') {
			$scope.setRegionName(region);
		} else if ($scope.dataSpec.county1 === '') {
			$scope.setCounty1(region);
		} else if ($scope.dataSpec.county2 === '') { 
			$scope.setCounty2(region);
		} else {
			$scope.setCounty2($scope.dataSpec.county1);
			$scope.setCounty1(region);
		}
	}

	$scope.dataForCounty = function(countyName) {
		for (var i=0; i<$scope.dataSpec.subRegionData.length; i++) {
			if ($scope.dataSpec.subRegionData[i].name==countyName) {
				return $scope.dataSpec.subRegionData[i].value;
			}
		}
	}
	
	$scope.updateData = function(regionChanged) {
		mapDataService.getRegionalDataForDate($scope.dataSpec.regionName, $scope.dataSpec.year+'-'+$scope.dataSpec.month+'-01', function(data) {
			$scope.dataSpec.usValue = data.us.value;
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
			}
			if ($scope.dataSpec.county2!='') {
				$scope.county2Value = $scope.dataForCounty($scope.dataSpec.county2);
			}
		});
	};
	
	$scope.$watch('dataSpec.regionName', function() {
		//if($scope.dataSpec.regionName !== 'United States' && $scope.dataSpec.currentStep === 1) $scope.dataSpec.currentStep = 2; 
		$scope.updateData(true);
		});
	
	$scope.$watch('dataSpec.year+"-"+dataSpec.month', function() {
		$scope.updateData(false);
		});
		
	// tools for charting the data...
	$scope.usChartData = [];
	$scope.stateChartData = [];
	$scope.county1ChartData = [];
	$scope.county2ChartData = [];
	
	$scope.$watch('dataSpec.county1+" "+dataSpec.county2', function() {
		if ($scope.dataSpec.county1!='') {
			$scope.county1Value = $scope.dataForCounty($scope.dataSpec.county1);
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

	//Graphing tools...
	$scope.selectedRegions = [];
	$scope.highestVisibleRate = 10;

	$scope.toggleGraphLine = function(region) {
		if(region.selected === true) {
			region.selected = false;
		} else {
			region.selected = true;
		} 
    	$scope.selectedRegions = [];
    	_.each($scope.graphLines, function(element, index, list) {
    		if(element.selected === true) $scope.selectedRegions.push(element);
    	});
    }

    $scope.unemploymentRateMap = {};

	$scope.graphLines = [
		{
			name: 'United States',
			data: $scope.usChartData,
			color: 'blue',
			lineStyle: '4,2',
			selected: false,
			update: function() {
				this.data = $scope.usChartData;
			}
		},{
			name: $scope.dataSpec.regionName,
			data: $scope.stateChartData,
			color: 'green',
			lineStyle: '4,2',
			selected: false,
			update: function() {
				this.data = $scope.stateChartData;
				this.name = $scope.dataSpec.regionName;
			}
		},{
			name: $scope.dataSpec.county1,
			data: $scope.county1ChartData,
			color: 'purple',
			lineStyle: '0',
			selected: false,
			update: function() {
				this.data = $scope.county1ChartData;
				this.name = $scope.dataSpec.county1;
			}
		},{
			name: $scope.dataSpec.county2,
			data: $scope.county2ChartData,
			color: 'purple',
			lineStyle: '3,2',
			selected: false,
			update: function() {
				this.data = $scope.county2ChartData;
				this.name = $scope.dataSpec.county2;
			}
		}
	];

	$scope.$watch('usChartData + stateChartData + county1ChartData + county2ChartData + dataSpec.month + dataSpec.year', function() {
		$scope.unemploymentRateMap['United States'] = $scope.dataSpec.usValue;
		$scope.unemploymentRateMap[$scope.dataSpec.regionName] = $scope.regionValue;
		$scope.unemploymentRateMap[$scope.dataSpec.county1] = $scope.county1Value;
		$scope.unemploymentRateMap[$scope.dataSpec.county2] = $scope.county2Value;
		_.each($scope.graphLines, function(element, index, list) {
			element.update();
		});
	});

	$scope.highestUnempRateOfSelectedPeriods = function() {
          var highestUnempRates = [];
          _.each($scope.selectedRegions, function(region, index, list) {
            var arrayWithHighestVal = _.max(region.data, function(member) { return member[1]; });
            highestUnempRates.push(arrayWithHighestVal[1]);
          })
          $scope.highestVisibleRate = (_.max(highestUnempRates) > 0) ? _.max(highestUnempRates) : 10;
	}

	$scope.$watch('selectedRegions', function() {
		$scope.highestUnempRateOfSelectedPeriods();
	});

	$scope.showMonthDialPopover = false;

  }]);
