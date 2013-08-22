'use strict';

unemploymentApp.controller('Level4Ctrl', ['$scope',  function($scope ) {
	
	$scope.recessions = [
		{name: "Great Depression: August 1929 - March 1933", color: "purple"},
		{name: "May 1937 - June 1938", color: "green"},
		{name: "February 1945 - October 1945", color: "blue"},
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

}]);
