'use strict';

angular.module('directives.ue.level-4', [])
.directive('fooBar',['$position', '$timeout', function($position, $timeout){
	return {
		restrict: 'EAC',
		link: function() {
			console.log("foo-bar");
		}
	}
}]);