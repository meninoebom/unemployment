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
			scope.$on(showEvent, function(e, fadeInCallback, fadeOutCallback, timer) {
				scope.$broadcast('closeAllPopovers', element);
				if(showing) return;
				showing = true;
				var timeOutId;
				$(element).fadeIn('slow', function() {
					if (timer) {
						timeOutId = window.setTimeout(function() {
							$(element).fadeOut('slow', function() {
								showing = false;
								if (fadeOutCallback) fadeOutCallback();
							});
							$('body').unbind('click.popover keyup.popover');
						}, timer);
					}
					$('body').bind('click.popover keyup.popover', function(e) {
						console.log('click.popover');
						window.clearTimeout(timeOutId);
						$(element).fadeOut('slow');
						$(this).unbind('click.popover keyup.popover');
						showing = false;
						if (fadeOutCallback) fadeOutCallback();
						return;
					});
					if (fadeInCallback) fadeInCallback();
				});
			});
			scope.$on('closeAllPopovers', function(e, src) {
				if(element === src) return;
				showing = false;
				$(element).fadeOut('slow');
			});
		}
	}
}]);