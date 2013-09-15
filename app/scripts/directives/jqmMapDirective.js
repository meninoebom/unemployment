'use strict';

angular.module('directives.mapping', [])
.directive('jqmMap',['mapDataService',function(mapDataService){
		return {
			restrict: 'A',
			replace: true,
			link: function(scope, element, attrs, ngModel) {
			}
		}
	}]);
