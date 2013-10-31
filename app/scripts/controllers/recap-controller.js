'use strict';

unemploymentApp.controller('RecapCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.step = 1;
	$scope.next = function() {
		$scope.step += 1;
	}	
	$scope.finish = function() {
		$state.transitionTo('intro'); 
	}
}]);