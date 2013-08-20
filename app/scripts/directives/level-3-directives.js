'use strict';

angular.module('directives.ue.level-3', [])
.directive('level3TestDir',['$position', '$timeout', function($position, $timeout){
	return {
		restrict: 'EAC',
		link: function() {
			console.log("Hello World!");
		}
	}
}]);