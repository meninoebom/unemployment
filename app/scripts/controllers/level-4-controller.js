'use strict';

unemploymentApp.controller('Level4Ctrl', ['$scope', 'unemploymentDataService',  function($scope, unemploymentDataService) {
	
	$scope.test = "foo";	

	$scope.recessions = [
		{name: "Great Depression: August 1929 - March 1933", startDate: "1929-08", endDate: "1933-03", color: ""},
		{name: "May 1937 - June 1938", startDate: "1937-05", endDate: "1938-06", color: ""},
		{name: "February 1945 - October 1945", startDate: "1945-02", endDate: "1945-10", color: ""},
		{name: "Novemeber 1948 - October 1949", startDate: "1948-11", endDate: "1949-10", color: ""},
		{name: "July 1953 - May 1954", startDate: "1953-07", endDate: "1954-05", color: ""},
		{name: "August 1957 - April 1958", startDate: "1957-08", endDate: "1958-04", color: ""},
		{name: "April 1960 - February 1961", startDate: "1960-04", endDate: "1961-02", color: ""},
		{name: "December 1969 - Novemeber 1970", startDate: "1969-12", endDate: "1970-11", color: ""},
		{name: "November 1973 - March 1975", startDate: "1973-11", endDate: "1975-03", color: ""},
		{name: "Janurary 1980 - July 1980", startDate: "1980-01", endDate: "1980-07", color: ""},
		{name: "July 1981 - Novemeber 1982", startDate: "1981-07", endDate: "1982-11", color: ""},
		{name: "July 1990 - March 1991", startDate: "1990-07", endDate: "1991-03", color: ""},
		{name: "March 2001 - Novemeber 2001", startDate: "2001-03", endDate: "2001-11", color: ""},
		{name: "Great Recession: December 2007 - June 2009", startDate: "2007-12", endDate: "2009-06", color: ""}
	];

//TODO complete this model data
	$scope.expansions = [
		{name: "October 1945 - Novemeber 1948", color: ""},
		{name: "October 1949 - July 1953", color: ""},
		{name: "May 1954 - August 1957", color: ""},
		{name: "April 1958 - April 1960", color: ""},
		{name: "Feb 1961 - December 1969", color: ""}
	];

	$scope.currentQuestion = 1;

	$scope.showQuestion = function(num) {
		return ($scope.currentQuestion == num) ? true : false; 
	}

	$scope.submitResponse = function() {
		$scope.currentQuestion++; 
	}

	$scope.recessionsIsCollapsed = false;
	$scope.expansionsIsCollapsed = false;
	$scope.availableSelectionColors = ['purple','green','blue'];
	$scope.selectedPeriods = [];
	$scope.currentSelectionList;

	$scope.showScrubBarPopover = false;
	$scope.toggleShowScrubBarPopover = function(state) {
        $scope.showScrubBarPopover = state;
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
		period.currentMonthYear = unemploymentDataService.getFormattedMonthYear(period.startDate, 0);    	
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
}]);
