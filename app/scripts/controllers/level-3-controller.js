'use strict';

unemploymentApp.controller('Level3Ctrl', ['$scope','$state', '$timeout', 'mapDataService', 'unemploymentDataService',  function($scope, $state ,$timeout, mapDataService, unemploymentDataService) {

	$scope.dataSpec = {};
	$scope.dataSpec.question = 1;
	$scope.dataSpec.latestDateAvailable = {
		year: 2013,
		month: 7,
		monthName: 'July'
	};
	$scope.dataSpec.usValue = 0;
	$scope.dataSpec.view = "map";
	$scope.dataSpec.mode = "exploration";
	$scope.dataSpec.year = '2000';
	$scope.dataSpec.month = '1';
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
	$scope.acceptingResponses = true;

	// to handle some date formatting issues...
	$scope.monthNames = [
	    "January", "February", "March",
	    "April", "May", "June",
	    "July", "August", "September",
	    "October", "November", "December"
	];

	$scope.answers = {
		1: function() {
			var startYear = $scope.dataSpec.latestDateAvailable.year-1;
			var startUnempRate = unemploymentDataService.getUSUnemploymentDataForDate(startYear+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			var endUnempRate = unemploymentDataService.getUSUnemploymentDataForDate($scope.dataSpec.latestDateAvailable.year+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			if (startUnempRate === endUnempRate) return 'stayed the same';
			if (startUnempRate > endUnempRate) return 'decreased';
			if (startUnempRate < endUnempRate) return 'increased';
		},
		2: function() {
			//////////////////////////////////
			//need to get Natural Unemployment Rate
			//////////////////////////////////
			var naturalUnempRate = 8;
			var unempRate = unemploymentDataService.getUSUnemploymentDataForDate($scope.dataSpec.latestDateAvailable.year+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			if (unempRate === naturalUnempRate) return 'stayed the same';
			if (unempRate > naturalUnempRate) return 'higher';
			if (unempRate < naturalUnempRate) return 'lower';
		},
		3: function() {
			var startYear = $scope.dataSpec.latestDateAvailable.year-1;
			var startLFPRate = unemploymentDataService.getLaborForceDataForForDate(startYear+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			var endLFPRate = unemploymentDataService.getLaborForceDataForForDate($scope.dataSpec.latestDateAvailable.year+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			if (startLFPRate === endLFPRate) return 'stayed the same';
			if (startLFPRate > endLFPRate) return 'decreased';
			if (startLFPRate < endLFPRate) return 'increased';
		},
		4: function() {
			var answer1 = $scope.answers[1]();
			var answer2 = $scope.answers[2]();
			var answer3 = $scope.answers[3]();
			if (answer2 === 'lower') {
				return (answer1 === 'increased' || answer3 === 'increased') ? 'a' : 'b';
			} else if (answer2== 'higher') {
				return (answer1 === 'increased' || answer3 === 'increased') ? 'c' : 'd';
			}
		},
		5: function() {
			var nationalUnempRate = unemploymentDataService.getUSUnemploymentDataForDate($scope.dataSpec.latestDateAvailable.year+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			var stateUnempRate = mapDataService.getStateUnempDataForDate($scope.dataSpec.regionName, $scope.dataSpec.latestDateAvailable.year+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			if (stateUnempRate === nationalUnempRate) return 'stayed the same';
			if (stateUnempRate > nationalUnempRate) return 'higher';
			if (stateUnempRate < nationalUnempRate) return 'lower';	
		},
		6: function() {
			var county1Rate = mapDataService.getCountyUnempDataForDate($scope.dataSpec.regionName, $scope.dataSpec.county1, $scope.dataSpec.latestDateAvailable.year+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			var county2Rate = mapDataService.getCountyUnempDataForDate($scope.dataSpec.regionName, $scope.dataSpec.county2, $scope.dataSpec.latestDateAvailable.year+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			if (county1Rate === county2Rate) return 'stayed the same';
			if (county1Rate > county2Rate) return 'higher';
			if (county1Rate < county2Rate) return 'lower';
		}
	};

	$scope.submitResponse = function() {
		if (!$scope.acceptingResponses) return;
		
		var question = $scope.dataSpec.question;
		
		if (question === 5 && !$scope.hasChosenAState()) {
			$scope.$broadcast("showQuestion5InstructionPopover", $scope.lock, $scope.unlock);
			return;
		}

		if (question === 6 && !$scope.hasChosenTwoCounties()) {
			$scope.$broadcast("showQuestion6InstructionPopover", $scope.lock, $scope.unlock);
			return;
		}

		var response = $("input[name=question"+question+"]:checked").val();
		
		if (response === undefined || response === 'undefined' || response === '') {
			$scope.$broadcast('showChooseAnAnswerPopover', $scope.lock, $scope.unlock);
			return;
		} 

		var answer = $scope.answers[question]();

		if (response === answer) {
			if(question === 6) {
				$scope.$broadcast('showCorrectPopover', $scope.lock, function() {
					function goToLevel4() {
				        $scope.$broadcast('closeAllPopovers');
						$state.transitionTo('level-4-intro');	
				    }
				    setTimeout(goToLevel4, 5000);
					return;
				});
			} else {
				$scope.$broadcast('showCorrectPopover', $scope.lock, $scope.loadNextQuestion);
			}
		} else if (response !== answer) {
			var eventName = "showQuestion"+question+"IncorrectPopover";
			$scope.$broadcast(eventName, $scope.lock, $scope.unlock);
		}
	}

	$scope.loadNextQuestion = function() {
		$scope.unlock();
		$scope.$apply(function() {
			$scope.dataSpec.question += 1;
		});
	}

	$scope.lock = function() {
		$scope.acceptingResponses = false;
	}

	$scope.unlock = function() {
		$scope.acceptingResponses = true;
	}

	$scope.hasChosenAState = function() {
		return ($scope.dataSpec.regionName === 'United States') ? false : true;
	}

	$scope.hasChosenTwoCounties = function() {
		return ($scope.dataSpec.county1 != '' && $scope.dataSpec.county2 != '') ? true : false;
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
	
	$scope.$watch('dataSpec.regionName+" "+dataSpec.county1+" "+dataSpec.county2', function() {
		if ($scope.dataSpec.county1!='') {
			$scope.county1Value = $scope.dataForCounty($scope.dataSpec.county1);
		}
		if ($scope.dataSpec.county2!='') {
			$scope.county2Value = $scope.dataForCounty($scope.dataSpec.county2);
		}
		mapDataService.getChartableData($scope.dataSpec.regionName, $scope.dataSpec.county1, $scope.dataSpec.county2, function(result) {
			var rawDateString = String(result.us[result.us.length-1][0]);
			var rawDateArray = rawDateString.split('.');
			$scope.dataSpec.latestDateAvailable.year = rawDateArray[0];
			var monthNum = Math.round(String(rawDateArray[1]*12).split("").splice(0,2).join("."));
			$scope.dataSpec.latestDateAvailable.month = monthNum;
			$scope.dataSpec.latestDateAvailable.monthName = $scope.monthNames[monthNum-1];
			$scope.usChartData = result.us;
			$scope.stateChartData = result.state;
			$scope.county1ChartData = result.county1;
			$scope.county2ChartData = result.county2;
		});
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
			lineStyle: '10,3,5,3',
			selected: false,
			update: function() {
				this.data = $scope.usChartData;
			},
			show: function() {
				return (this.data == "") ? false : true;
			}
		},{
			name: $scope.dataSpec.regionName,
			data: $scope.stateChartData,
			color: 'green',
			lineStyle: '6,2',
			selected: false,
			update: function() {
				this.data = $scope.stateChartData;
				this.name = $scope.dataSpec.regionName;
			},
			show: function() {
				return (this.name === 'United States' || this.data == "") ? false : true;
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
			},
			show: function() {
				return (this.data == "") ? false : true;
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
			},
			show: function() {
				return (this.data == "") ? false : true;
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
