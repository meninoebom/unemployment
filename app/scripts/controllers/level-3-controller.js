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
	$scope.dataSpec.lfpValue = 0;
	$scope.dataSpec.nairuValue = 0;
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
	$scope.locked = false;
	$scope.attempts = 0;
	$scope.currentAnswer;
	$scope.currentResponse;
	$scope.instruction;

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
			var startLFPRate = unemploymentDataService.getLaborForceDataForDate(startYear+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
			var endLFPRate = unemploymentDataService.getLaborForceDataForDate($scope.dataSpec.latestDateAvailable.year+'-'+$scope.dataSpec.latestDateAvailable.month+'-01');
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

	$scope.firstIncorrectAttemptHints = {
		1: {
			answers: {
				'increased': {
					responses: {
						'increased': undefined,
						'decreased': function(){ 
							return "The unemployment rate changed between "+$scope.month1()+" and "+$scope.month2()+", but it did not decrease."; 
						},
						'stayed the same': function(){ 
							return "You're close. The unemployment rate changed between "+$scope.month1()+" and "+$scope.month2()+".  Did it increase or decrease?"; 
						}
					}
				},
				'decreased': {
					responses: {
						'increased': function(){ 
							return "You're close. The unemployment rate changed between "+$scope.month1()+" and "+$scope.month2()+", but it did not increase."; 
						},
						'decreased': undefined,
						'stayed the same': function(){ 
							return "The unemployment rate changed between "+$scope.month1()+" and "+$scope.month2()+".  Did it increase or decrease?"; 
						}
					}
				},
				'stayed the same': {
					responses: {
						'increased': function(){ 
							return "The unemployment rate did not change between "+$scope.month1()+" and "+$scope.month2()+"."; 
						},
						'decreased': function(){ 
							return "The unemployment rate did not change between "+$scope.month1()+" and "+$scope.month2()+"."
						},
						'stayed the same': undefined
					}
				}
			}
		},
		2: {
			answers: {
				'higher': {
					responses: {
						'higher': undefined,
						'lower': function(){ 
							return "You're close.  In "+$scope.month2()+" the unemployment rate is different than the natural rate of unemployment, but it is not lower."; 
						},
						'stayed the same': function(){ 
							return "In "+$scope.month2()+", the unemployment rate is different than the natural rate of unemployment.  Is it higher or lower?"; 
						}
					}
				},
				'lower': {
					responses: {
						'higher': function(){ 
							return "You're close. In "+$scope.month2()+", the unemployment rate is different than the natural rate of unemployment, but it is not higher."; 
						},
						'lower': undefined,
						'stayed the same': function(){ 
							return "In "+$scope.month2()+", the unemployment rate is different than the natural rate of unemployment.  Is it higher or lower?"; 
						}
					}
				},
				'stayed the same': {
					responses: {
						'higher': function(){ 
							return "In "+$scope.month2()+", the unemployment rate is not different than the natural rate of unemployment."; 
						},
						'lower': function(){ 
							return "In "+$scope.month2()+", the unemployment rate is not different than the natural rate of unemployment."; 
						},
						'stayed the same': undefined
					}
				}
			}
		},
		3: {
			answers: {
				'increased': {
					responses: {
						'increased': undefined,
						'decreased': function(){ 
							return "You're close. The labor force participation rate changed between "+$scope.month1()+" and "+$scope.month2()+", but it did not decrease."; 
						},
						'stayed the same': function(){ 
							return "The labor force participation rate changed between "+$scope.month1()+" and "+$scope.month2()+".  Did it increase or decrease?"; 
						}
					}
				},
				'decreased': {
					responses: {
						'increased': function(){ 
							return "You're close. The labor force participation rate changed between "+$scope.month1()+" and "+$scope.month2()+", but it did not increase."; 
						},
						'decreased': undefined,
						'stayed the same': function(){ 
							return "The labor force participation rate changed between "+$scope.month1()+" and "+$scope.month2()+".  Did it increase or decrease?"; 
						}
					}
				},
				'stayed the same': {
					responses: {
						'increased': function(){ 
							return "The labor force participation rate did not change between "+$scope.month1()+" and "+$scope.month2()+"."; 
						},
						'decreased': function(){ 
							return "The labor force participation rate did not change between "+$scope.month1()+" and "+$scope.month2()+"."
						},
						'stayed the same': undefined
					}
				}
			}
		},
		4: {
			answers: {
				'a': {
					responses: {
						'a': undefined,
						'b': function() { 
							return ""; 
						},
						'c': function() { 
							return ""; 
						},
						'd': function() {
							return""; 
								}
					}
				},
				'b': {
					responses: {
						'a': function() {
							return ""; 
						},
						'b': undefined,
						'c': function() { 
							return ""; 
						},
						'd': function() {
							return""; 
								}
					}
				},
				'c': {
					responses: {
						'a': function() {
							return ""; 
						},
						'b': function() { 
							return ""; 
						},
						'c': undefined,
						'd': function() {
							return""; 
								}
					}
				},
				'd': {
					responses: {
						'a': function() {
							return ""; 
						},
						'b': function() { 
							return ""; 
						},
						'c': function() { 
							return ""; 
						},
						'd': undefined
					}
				}
			}
		},
		5: {
			answers: {
				'higher': {
					responses: {
						'higher': undefined,
						'lower': function(){ 
							return "You're close.  In "+$scope.month2()+" the unemployment rate in "+$scope.dataSpec.regionName+" is different than the natural rate of unemployment, but it is not lower."; 
						},
						'stayed the same': function(){ 
							return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is different than the natural rate of unemployment.  Is it higher or lower?"; 
						}
					}
				},
				'lower': {
					responses: {
						'higher': function(){ 
							return "You're close. In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is different than the natural rate of unemployment, but it is not higher."; 
						},
						'lower': undefined,
						'stayed the same': function(){ 
							return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is different than the natural rate of unemployment.  Is it higher or lower?"; 
						}
					}
				},
				'stayed the same': {
					responses: {
						'higher': function(){ 
							return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is not different than the natural rate of unemployment."; 
						},
						'lower': function(){ 
							return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is not different than the natural rate of unemployment."; 
						},
						'stayed the same': undefined
					}
				}
			}
		},
		6: {
			answers: {
				'higher': {
					responses: {
						'higher': undefined,
						'lower': function(){ 
							return "You're close.  In "+$scope.month2()+" the unemployment rate in "+$scope.dataSpec.county1+" is different than the unemployment rate in "+$scope.dataSpec.county2+", but it is not lower."; 
						},
						'stayed the same': function(){ 
							return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.county1+" is different than the unemployment rate in "+$scope.dataSpec.county2+".  Is it higher or lower?"; 
						}
					}
				},
				'lower': {
					responses: {
						'higher': function(){ 
							return "You're close. In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.county1+" is different than the unemployment rate in "+$scope.dataSpec.county2+", but it is not higher."; 
						},
						'lower': undefined,
						'stayed the same': function(){ 
							return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.county1+" is different than the unemployment rate in "+$scope.dataSpec.county2+".  Is it higher or lower?"; 
						}
					}
				},
				'stayed the same': {
					responses: {
						'higher': function(){ 
							return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.county1+" is not different than the unemployment rate in "+$scope.dataSpec.county2+"."; 
						},
						'lower': function(){ 
							return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.county1+" is not different than the unemployment rate in "+$scope.dataSpec.county2+"."; 
						},
						'stayed the same': undefined
					}
				}
			}
		}		
	}// end of incorrectResponseFeedback 

	$scope.secondIncorrectAttemptHints = {
		1: {
			answers: {
				'increased':  function(){ 
					return "The unemployment rate increased between "+$scope.month1()+" and "+$scope.month2()+"."; 
				},
				'decreased': function(){ 
					return "The unemployment rate decreased between "+$scope.month1()+" and "+$scope.month2()+"."; 
				},
				'stayed the same': function(){ 
					return "The unemployment rate stayed the same between "+$scope.month1()+" and "+$scope.month2()+"."; 
				}
			}
		},
		2: {
			answers: {
				'higher':  function(){ 
					return "In "+$scope.month2()+", the unemployment rate is higher than the natural rate of unemployment."; 
				},
				'lower': function(){ 
					return "In "+$scope.month2()+", the unemployment rate is lower than the natural rate of unemployment."; 
				},
				'stayed the same': function(){ 
					return "In "+$scope.month2()+", the unemployment rate is the same as the natural rate of unemployment."; 
				}
			}
		},
		3: {
			answers: {
				'increased':  function(){ 
					return "The labor force participation rate increased between "+$scope.month1()+" and "+$scope.month2()+"."; 
				},
				'decreased': function(){ 
					return "The labor force participation rate decreased between "+$scope.month1()+" and "+$scope.month2()+"."; 
				},
				'stayed the same': function(){ 
					return "The labor force participation rate stayed the same between "+$scope.month1()+" and "+$scope.month2()+"."; 
				}
			}
		},
		4: {
			answers: {
				'increased':  function(){ 
					return ""; 
				},
				'decreased': function(){ 
					return ""; 
				},
				'stayed the same': function(){ 
					return "";
				}
			}
		},
		5: {
			answers: {
				'higher':  function(){ 
					return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is higher than the natural rate of unemployment."; 
				},
				'lower': function(){ 
					return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is lower than the natural rate of unemployment."; 
				},
				'stayed the same': function(){ 
					return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is the same as the natural rate of unemployment."; 
				}
			}
		},
		6: {
			answers: {
				'higher':  function(){ 
					return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is higher than the unemployment rate in "+$scope.dataSpec.county2+"."; 
				},
				'lower': function(){ 
					return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is lower than the unemployment rate in "+$scope.dataSpec.county2+"."; 
				},
				'stayed the same': function(){ 
					return "In "+$scope.month2()+", the unemployment rate in "+$scope.dataSpec.regionName+" is the same as the unemployment rate in "+$scope.dataSpec.county2+"."; 
				}
			}
		}
	}

	$scope.month1 = function() {
		var month = $scope.dataSpec.latestDateAvailable.monthName + " " + $scope.dataSpec.latestDateAvailable.year;
		return month; 
	}

	$scope.month2 = function() {
		var month = $scope.dataSpec.latestDateAvailable.monthName;
		var year = $scope.dataSpec.latestDateAvailable.year-1;
		var month = month +"  " + year;
		return month; 
	}

	$scope.submitResponse = function() {
		if ($scope.locked) return;
		
		var question = $scope.dataSpec.question;
		
		if (question === 5 && !$scope.hasChosenAState()) {
			$scope.instruction = "Choose a state."
			$scope.$broadcast('showInstructionPopover', 
				function () { $scope.locked = true; },
				function() { $scope.locked = false; },
				3000
			);
			return;
		}

		if (question === 6 && !$scope.hasChosenTwoCounties()) {
			$scope.instruction = "Choose two counties."
			$scope.$broadcast('showInstructionPopover', 
				function () { $scope.locked = true; },
				function() { $scope.locked = false; },
				3000
			);
			return;			
		}

		var response = $("input[name=question"+question+"]:checked").val();
		
		if (response === undefined || response === 'undefined' || response === '') {
			$scope.instruction = "Choose an answer."
			$scope.$broadcast('showInstructionPopover', 
				function () { $scope.locked = true; },
				function() { $scope.locked = false; },
				3000
			);
			return;
		} else {
			$scope.currentResponse = response; 
		}

		var answer = $scope.answers[question]();
		$scope.currentAnswer = answer;

		if (response === answer) {
			$scope.attempts = 0;
			if(question === 6) {
				$scope.$broadcast('showCorrectResponsePopover', 
					function() { $scope.locked = true; },
					function() { $scope.goToLevel4(); },
					2000
				);
			} else {
				$scope.$broadcast('showCorrectResponsePopover', 
					function() { $scope.locked = true; },
					function() { 
						$scope.locked = false;
						$scope.loadNextQuestion(); 
					} ,
					2000
				);
			}
		} else if (response !== answer) {
			$scope.attempts +=1;
			$scope.$broadcast("showIncorrectResponsePopover", 
				function () { $scope.locked = true; },
				function() { $scope.locked = false; },
				3000
			);
		}
	}

	$scope.getIncorrectResponseFeedback = function() {
		if ($scope.attempts === 1) {	
			var data = $scope.firstIncorrectAttemptHints;
			var question = $scope.dataSpec.question;
			var answer = $scope.currentAnswer;
			var response = $scope.currentResponse;
			if (data[question].answers[answer] === undefined || data[question].answers[answer] === '') return;
			var feedback = data[question].answers[answer].responses[response]();
			if (feedback === undefined || feedback === '') return;
			return feedback;
		} else if ($scope.attempts > 1) {
			var data = $scope.secondIncorrectAttemptHints;
			var question = $scope.dataSpec.question;
			var answer = $scope.currentAnswer;
			var feedback = data[question].answers[answer]();
			if (feedback === undefined || feedback === '') return;
			return feedback;
		}
	}

	$scope.loadNextQuestion = function() {
		if ($scope.locked) return;
		$scope.locked = false;
		$scope.$apply(function() {
			$scope.dataSpec.question += 1;
		});
	}

	$scope.goToLevel4 = function() {
		$scope.$broadcast('closeAllPopovers');
		$state.transitionTo('level-4-intro');
	}

	$scope.hasChosenAState = function() {
		return ($scope.dataSpec.regionName === 'United States') ? false : true;
	}

	$scope.hasChosenTwoCounties = function() {
		return ($scope.dataSpec.county1 != '' && $scope.dataSpec.county2 != '') ? true : false;
	}

	$scope.showRegionDropdown = function() {
		var hasChosenAState = $scope.hasChosenAState();
		return ($scope.dataSpec.question <= 5) ? true : false;
	}
	
	$scope.showExplorationModeCountyDropdown = function() {
		return ($scope.dataSpec.question <= 4 && $scope.hasChosenAState() ) ? true : false;
	}	

	$scope.showGraphingModeCountyDropdown = function() {
		return ($scope.dataSpec.question === 6) ? true : false;
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

		unemploymentDataService.getLaborForceDataForDateAsync($scope.dataSpec.year+'-'+$scope.dataSpec.month+'-01', function(data) {
			$scope.dataSpec.lfpValue = data;
		});

		unemploymentDataService.getNairuDataForDateAsync($scope.dataSpec.year+'-'+$scope.dataSpec.month+'-01', function(data) {
			$scope.dataSpec.nairuValue = data;
		});

		unemploymentDataService.getLatestDateAvailableInDataSeries(function(d) {
			var y = d.split('-')[0];
			var m = d.split('-')[1];
			$scope.dataSpec.latestDateAvailable.year = y;
			$scope.dataSpec.latestDateAvailable.month = m;
			$scope.dataSpec.latestDateAvailable.monthName = $scope.monthNames[parseInt(m)-1];
		});

	};

	$scope.updateData(false);

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
