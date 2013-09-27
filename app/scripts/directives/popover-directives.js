'use strict';

angular.module('directives.ue.popovers', [])
.directive('uePopover',['$position', '$timeout', function($position, $timeout){
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		template: '<div class="custom-popover"><div ng-transclude></div></div>',
		link: function(scope, element, attrs) {
			var showEvent = attrs.showEvent;
			var showing = false;
			scope.$on(showEvent, function(e, fadeInCallback, fadeOutCallback, getContent) {
				scope.$broadcast('closeOtherPopovers', element);
				if(showing) return;
				showing = true;
				if (getContent) scope.content = getContent();
				$(element).fadeIn('slow', function() {
					$('body').bind('click.popover keyup.popover', function(e) {
						$(element).fadeOut('slow');
						$(this).unbind('click.popover keyup.popover');
						showing = false;
						fadeOutCallback();
						return;
					});
					fadeInCallback();
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
