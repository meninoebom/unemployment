'use strict';

angular.module('directives.ue.popovers', [])
.directive('incorrectPopover',['$position', '$timeout', function($position, $timeout){
	return {
		restrict: 'AC',
		replace: false,
		link: function(scope, element, attrs) {
			var showing = false;
			scope.$on('showIncorrectPopover', function() {
				if(showing) return;
				showing = true;
				$(element).fadeIn('slow', function() {
					$('body').bind('click.popover', function() {
						$(element).fadeOut('slow');
						$(this).unbind('click.popover');
						showing = false;
						return;
					});
				});
			});
		}
	}
}]);