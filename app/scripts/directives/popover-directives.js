'use strict';


//uePopovers have an attribute called "showEvent" 
//this showEvent attr has a value of a custom event that will be broadcast to tell the popover to appear 
//this custom event will also be loaded with 3 other tagalong parameters: a fadeInCallback that happens as soon as the popover fades in completely, 
//a fadeOutCallback that happens as soon as the popover is completely fadeded out, and a timer that is the amount of miliseconds the fading in and out will take

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