'use strict';

unemploymentApp.controller('Level4Ctrl', ['$scope',  function($scope ) {
	
	$scope.recessions = [
		{name: "Great Depression: August 1929 - March 1933"},
		{name: "May 1937 - June 1938"},
		{name: "February 1945 - October 1945"},
		{name: "Novemeber 1948 - October 1949"},
		{name: "July 1953 - May 1954"}
	];
	$scope.expansions = [
		{name: "October 1945 - Novemeber 1948"},
		{name: "October 1949 - July 1953"},
		{name: "May 1954 - August 1957"},
		{name: "April 1958 - April 1960"},
		{name: "Feb 1961 - December 1969"}
	];
	$scope.currentQuestion = 1;
	$scope.showQuestion = function(num) {
		return ($scope.currentQuestion == num) ? true : false; 
	}
	$scope.submitResponse = function() {
		$scope.currentQuestion++; 
	}

}]);
