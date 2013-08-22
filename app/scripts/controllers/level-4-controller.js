'use strict';

unemploymentApp.controller('Level4Ctrl', ['$scope',  function($scope ) {
	
	$scope.recessions = [
		{name: "Great Depression: August 1929 - March 1933", color: ""},
		{name: "May 1937 - June 1938", color: ""},
		{name: "February 1945 - October 1945", color: ""},
		{name: "Novemeber 1948 - October 1949", color: ""},
		{name: "July 1953 - May 1954", color: ""}
	];
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
	$scope.togglePeriodSelect = function(period, ngRepeatIndex) {
	    if(period.selected) {
	    	period.selected = false;
			$scope.selectedPeriods.splice(_.indexOf($scope.selectedPeriods, period),1);
			period.selectedOrderNum = "";
	    	$scope.availableSelectionColors.push(period.color);
			period.color = "";
	    } else {
	    	if($scope.selectedPeriods.length < 3) {
		    	period.selected = true;
		    	$scope.selectedPeriods.push(period);
		    	period.ngRepeatIndex = ngRepeatIndex;
		    	$scope.selectedPeriods = _.sortBy($scope.selectedPeriods, 'ngRepeatIndex');
		    	_.each($scope.selectedPeriods, function(period, index, list) {
		    		period.selectedOrderNum = index + 1;
		    	});
		    	period.color = $scope.availableSelectionColors.shift();
		    } else {
		    	return;
		    }
	    }
	}
}]);
