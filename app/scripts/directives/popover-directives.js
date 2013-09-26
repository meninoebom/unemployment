'use strict';

angular.module('directives.ue.popovers', [])
.directive('uePopover',['$position', '$timeout', function($position, $timeout){
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		template: '<div class="custom-popover"><div ng-transclude></div></div>',
		link: function(scope, element, attrs) {
			console.log(scope.numAttempts);
			var showEvent = attrs.showEvent;
			console.log(attrs);
			var content = "";
			var showing = false;
			scope.$on(showEvent, function() {
				scope.$broadcast('closeOtherPopovers', element);
				if(showing) return;
				showing = true;
				$(element).fadeIn('slow', function() {
					$('body').bind('click.popover keyup.popover', function() {
						$(element).fadeOut('slow');
						$(this).unbind('click.popover keyup.popover');
						showing = false;
						return;
					});
				});
			});
			scope.$on('closeOtherPopovers', function(e, src) {
				if(element === src) return;
				showing = false;
				$(element).fadeOut('slow');
			});
		}
	}
}]);
