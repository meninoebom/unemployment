'use strict';

unemploymentApp.controller('Level4Ctrl', ['$scope', 'unemploymentDataService', '$state',  function($scope, unemploymentDataService, $state) {
	$scope.dialPopCurMonth = {val: 0};
	$scope.detailPopCurMonth = {val: 0};
    $scope.detailPeriod = {};
	$scope.currentQuestionNum = {val: 4};
	$scope.recessionsIsCollapsed = true;
	$scope.expansionsIsCollapsed = true;
	$scope.selectedPeriods = [];
	$scope.currentSelectionList;
	$scope.showGridOrGraph = "graph";

	$scope.locked = false;
	$scope.attempts = 0;
	$scope.currentAnswer;
	$scope.currentResponse;
	$scope.instruction;
	
	$scope.availableSelectionColors = ['purple','green','blue'];

	$scope.recessions = [
		{name: "Great Depression: August 1929 - March 1933", startDate: "1929-08", endDate: "1933-03", monthsBefore: 4},
		{name: "May 1937 - June 1938", startDate: "1937-05", endDate: "1938-06"},
		{name: "February 1945 - October 1945", startDate: "1945-02", endDate: "1945-10"},
		{name: "November 1948 - October 1949", startDate: "1948-11", endDate: "1949-10"},
		{name: "July 1953 - May 1954", startDate: "1953-07", endDate: "1954-05"},
		{name: "August 1957 - April 1958", startDate: "1957-08", endDate: "1958-04"},
		{name: "April 1960 - February 1961", startDate: "1960-04", endDate: "1961-02"},
		{name: "December 1969 - November 1970", startDate: "1969-12", endDate: "1970-11"},
		{name: "November 1973 - March 1975", startDate: "1973-11", endDate: "1975-03"},
		{name: "Janurary 1980 - July 1980", startDate: "1980-01", endDate: "1980-07"},
		{name: "July 1981 - November 1982", startDate: "1981-07", endDate: "1982-11"},
		{name: "July 1990 - March 1991", startDate: "1990-07", endDate: "1991-03"},
		{name: "March 2001 - November 2001", startDate: "2001-03", endDate: "2001-11"},
		{name: "Great Recession: December 2007 - June 2009", startDate: "2007-12", endDate: "2009-06"}
	];

	$scope.expansions = [
		{name: "October 1945 - November 1948", startDate: "1945-10", endDate: "1948-11"},
		{name: "October 1949 - July 1953", startDate: "1949-10", endDate: "1953-07"},
		{name: "May 1954 - August 1957", startDate: "1954-03", endDate: "1957-08"},
		{name: "April 1958 - April 1960", startDate: "1958-04", endDate: "1960-04"},
		{name: "Feb 1961 - December 1969", startDate: "1961-02", endDate: "1969-12"}
	];

	$scope.questions = [
		{text: "During which of the recessionary periods did the United States Unemployement Rate reach the highest level?", a: "Great Depression: August 1929 - March 1933", b: "", c: "Great Recession: December 2007 - June 2009"},
		{text: "During which of the recessionary periods did the United States Unemployement Rate increase the most from its lowest to its highest?", a: "Great Depression: August 1929 - March 1933", b: "", c: "Great Recession: December 2007 - June 2009"},
		{text: "During which of the recessionary periods did the United States Unemployement Rate differ the most from the Natural Rate of Unemployment Historical average of 5.6%?", a: "Great Depression: August 1929 - March 1933", b: "", c: "Great Recession: December 2007 - June 2009"},
		{text: "During which of the expansionary periods did the United States Unemployement Rate reach the lowest level?", a: "", b: "", c: ""},
		{text: "During which of the following expansionary periods did the United States Unemployement Rate decrease the most from its highest to its lowest rate?", a: "", b: "", c: ""},
		{text: "During which of the following expansionary periods did the United States Unemployement Rate differ the most from the Natural Rate of Unemployment Historical average of 5.6%", a: "", b: "", c: ""}
	];

	$scope.answers = {
		1: function() {
			return 'a';
		},
		2: function() {
			return 'a';
		},
		3: function() {
			return 'a';
		},
		4: function() {
			var dataObj = $scope.getPeriodDataForQuestion(4);
			var rates = [];
			for (var i = 0; i < 3; i++) {
				rates[i] = {};
				var lowestKeyValPair = _.min(dataObj[i].unemploymentData, function(item) {
					return item[1];
				});
				rates[i].letter = dataObj[i].letter;
				rates[i].rate = lowestKeyValPair[1];
			}
			var lowestRate;
			for (var i = 0; i < 3; i++) {
				lowestRate = _.min(rates, function(item) {
					return item.rate;
				});
			}
			return lowestRate.letter;
		},
		5: function() {
			//TODO calculate and return answer dynamically
			return 'a';	
		},
		6: function() {
			//TODO calculate and return answer dynamically
			return 'a';
		}

	};

	$scope.getPeriodDataForQuestion = function(questionNum) {
		var dataObj = [];
		var periodNames = [$scope.questions[questionNum].a, $scope.questions[questionNum].b, $scope.questions[questionNum].c];
		var letterChoices = ['a','b','c'];
		for (var i = 0; i < 3; i++) {
			var period = _.findWhere($scope.expansions, {name: periodNames[i]})
			dataObj[i] = {
				letter: letterChoices[i], 
				unemploymentData: unemploymentDataService.getUnemploymentData(period.startDate, period.endDate, 12),
				lfpData: unemploymentDataService.getLaborForceData(period.startDate, period.endDate, 12)
			}
		}
		return dataObj;
	}

	$scope.toggleGridAndGraphViews = function(view) {
        if (view === "graph") {
        	$scope.showGridOrGraph = "graph";
        } else if (view === "grid") {
        	$scope.showGridOrGraph = "grid";        	
        }
    };

	$scope.showMonthDialPopover = false;
	$scope.toggleShowMonthDialPopover = function(state) {
        $scope.showMonthDialPopover = state;
    };

	$scope.showDetailPopover = false;
	$scope.toggleShowDetailPopover = function(state) {
        $scope.showDetailPopover = state;
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

	$scope.initQuestions = function() {
		var randomizedRecessions = [];
		_.each($scope.recessions, function(item, index, list){
			if(item.name !== "Great Depression: August 1929 - March 1933" && item.name !== "Great Recession: December 2007 - June 2009") {
				randomizedRecessions.push(item.name);
			}
		});
		randomizedRecessions = _.shuffle(randomizedRecessions);
		for (var i = 0; i < 3; i++) {
			$scope.questions[i].b = randomizedRecessions[i];
		}
		for (var j = 0; j < 3; j++) {
			var randomizedExpansions = [];
			_.each($scope.expansions, function(item, index, list){
				randomizedExpansions.push(item.name);
			});
			randomizedExpansions = _.shuffle(randomizedExpansions);
			$scope.questions[j+3].a = randomizedExpansions[j];
			$scope.questions[j+3].b = randomizedExpansions[j+1];
			$scope.questions[j+3].c = randomizedExpansions[j+2];
		}
	}

	$scope.initQuestions();

	$scope.submitResponse = function() {
		if ($scope.locked) return;

		var question = $scope.currentQuestionNum.val;
		var response = $("input[name=answer]:checked").val();
		var answer = $scope.answers[question]();
		$scope.currentAnswer = answer;

		if (response === undefined || response === 'undefined' || response === '') {
			$scope.instruction = "Choose and answer."
			$scope.$broadcast('showInstructionPopover', 
				function () { $scope.locked = true; },
				function() { $scope.locked = false; },
				3000
			);
			return;
		} else {
			$scope.currentResponse = response; 
		}

		if (response === answer) {
			if(question === 6) {
				$scope.$broadcast('showCorrectResponsePopover', 
					function() { $scope.locked = true; }, 
					function() { 
						$scope.$broadcast('closeAllPopovers');
						$state.transitionTo('intro'); 
					},
					2000 
				);
			} else {
				$scope.$broadcast('showCorrectResponsePopover', 
					function() { $scope.locked = true; },
					function() {
						$scope.loadNextQuestion();
						$scope.locked = false;
					 } ,
					2000
				);
			}
		} else if (response !== answer) {
			$scope.$broadcast("showIncorrectResponsePopover", 
				function () { $scope.locked = true; },
				function() { $scope.locked = false; },
				3000
			);
		}

	}

	$scope.loadNextQuestion = function() {
		$scope.$broadcast('closeAllPopovers');
		$scope.$apply(function() {
			$scope.currentQuestionNum.val += 1;
		});
		$("input[name=answer]:checked").prop('checked',false); 
	}

	$scope.getIncorrectResponseFeedback = function() {
		//to see how to implement this function using a somewhat comples data model, see level 3
		return "";
	}

}]);




















