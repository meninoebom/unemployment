'use strict';

unemploymentApp.controller('Level3Ctrl', ['$scope', '$timeout', 'mapDataService',  function($scope, $timeout, mapDataService) {

	$scope.dataSpec = {};
	$scope.dataSpec.currentStep = 4;
	$scope.dataSpec.usValue = 0;
	$scope.dataSpec.currentScale = "nation";
	$scope.dataSpec.currentView = "table";
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
		switch ($scope.dataSpec.currentStep) {
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
			default:
				$scope.dataSpec.currentStep += 1; 
		}
		//TODO after step 4 go to level 4
	}

	$scope.showFeedbackMessage = function(message) {
		$scope.dataSpec.feedbackMessage = message;
		angular.element('#incorrect-modal').modal('show');
	}

	$scope.setCurrentScale = function(scale) {
		$scope.dataSpec.currentScale = scale;
	}

	$scope.setCurrentView = function(view) {
		$scope.dataSpec.currentView = view;
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

}]).controller('graph', ['$scope', '$timeout', 'mapDataService',  function($scope, $timeout, mapDataService) {



	$scope.showMonthDialPopover = false;
	$scope.toggleShowMonthDialPopover = function(state) {
        $scope.showMonthDialPopover = state;
    };

	$scope.toggleSelectedPeriod = function(period, list, ngRepeatIndex) {
		if($scope.currentSelectionList && $scope.currentSelectionList != list ) {
			$scope.resetSelections();
		} 
		$scope.currentSelectionList = list;
	    if(period.selected) {
	    	$scope.deselectPeriod(period);
	    } else {
	    	if($scope.selectedPeriods.length < 3) {
	    		$scope.selectPeriod(period, ngRepeatIndex);
 		    } else {
		    	return;
		    }
	    }
	}

	$scope.selectPeriod = function(period, ngRepeatIndex) {
		period.selected = true;
    	$scope.selectedPeriods.push(period);
    	period.ngRepeatIndex = ngRepeatIndex;
    	$scope.selectedPeriods = _.sortBy($scope.selectedPeriods, 'ngRepeatIndex');
    	_.each($scope.selectedPeriods, function(period, index, list) {
    		period.selectedOrderNum = index + 1;
    	});
    	period.color = $scope.availableSelectionColors.shift();
		var currentDateFormatted = unemploymentDataService.getCurrentMonthYearFormatted(period.startDate, 0);
        period.currentMonthName = currentDateFormatted.monthName;
        period.currentYear = currentDateFormatted.fullYear;
        period.unemploymentData = unemploymentDataService.getUnemploymentData(period.startDate, period.endDate, 12);
        period.currentUnempRate = period.unemploymentData[11][1]; 
        period.laborForceData = unemploymentDataService.getLaborForceData(period.startDate, period.endDate, 12);
        period.currentLFPRate = (period.laborForceData[11]) ? period.unemploymentData[11][1] : '';  
        period.showInPopover = true;  	
	}

	$scope.deselectPeriod = function(period) {
		period.selected = false;
		$scope.selectedPeriods.splice(_.indexOf($scope.selectedPeriods, period),1);
		period.selectedOrderNum = "";
    	$scope.availableSelectionColors.push(period.color);
		period.color = "";
	}

	$scope.resetSelections = function() {
		var unSelectedPeriods = $scope.selectedPeriods.slice(0); //had to make a copy by value of the array
		_.each(unSelectedPeriods, function(period, index, list) {
    		$scope.deselectPeriod(period);
    	});
	}

	$scope.lastMonthNumOfSelectedPeriods = function() {
		  var periodsSortedByLongest = _.sortBy($scope.selectedPeriods, function(period) {
            return unemploymentDataService.calculateMonthsBetween(period.startDate, period.endDate);
          });
          var longestPeriod = periodsSortedByLongest.length ? periodsSortedByLongest[periodsSortedByLongest.length-1] : undefined;
          $scope.lastMonthVisible =(longestPeriod) ? unemploymentDataService.calculateMonthsBetween(longestPeriod.startDate, longestPeriod.endDate) : 12;
	}

	$scope.highestUnempRateOfSelectedPeriods = function() {
          var highestUnempRates = [];
          _.each($scope.selectedPeriods, function(period, index, list) {
            var arrayWithHighestVal = _.max(period.unemploymentData, function(member) { return member[1]; })
            highestUnempRates.push(arrayWithHighestVal[1]);
          })
          $scope.highestVisibleRate = (_.max(highestUnempRates) > 0) ? _.max(highestUnempRates) : 10;
	}

	$scope.makeCollectionFromRange = function(min, max){
		var input = [];
		for (var i=min; i<=max; i++) input.push(i);
		return input;
	};

	$scope.$watch('selectedPeriods.length', function() {
		$scope.highestUnempRateOfSelectedPeriods();
		$scope.lastMonthNumOfSelectedPeriods();
	});

	$scope.$watch('lastMonthVisible', function() {
		$scope.monthDropDown = $scope.makeCollectionFromRange(-12, $scope.lastMonthVisible);
	});

	$scope.setCurrentMonth = function(month) {
		$scope.dialPopCurMonth.val = month;
		$scope.$broadcast("moveMonthDial");
	}

	$scope.prevMonth = function() {
		if($scope.dialPopCurMonth.val <= -12) return;
		$scope.dialPopCurMonth.val -= 1;
		$scope.$broadcast("moveMonthDial");		
	}

	$scope.nextMonth = function() {
		if($scope.dialPopCurMonth.val >= $scope.lastMonthNumOfSelectedPeriods()) return;
		$scope.dialPopCurMonth.val += 1;
		$scope.$broadcast("moveMonthDial");
	}





  }]);
