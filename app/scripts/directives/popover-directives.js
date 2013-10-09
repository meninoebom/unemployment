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
			scope.$on(showEvent, function(e, fadeInCallback, fadeOutCallback, content) {
				scope.$broadcast('closeAllPopovers', element);
				if(showing) return;
				showing = true;
				if (content) scope.content = content;
				$(element).fadeIn('slow', function() {
					$('body').bind('click.popover keyup.popover', function(e) {
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
}]).directive('uePopover2',['$position', '$timeout', function($position, $timeout){
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
							})	
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