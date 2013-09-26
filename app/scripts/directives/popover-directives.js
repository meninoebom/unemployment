'use strict';

angular.module('directives.ue.popovers', [])
.directive('customPopover',['$position', '$timeout', function($position, $timeout){
	return {
		restrict: 'C',
		replace: false,
		link: function(scope, element, attrs) {
			var showEvent = attrs.showEvent;
			var content = "";
			var showing = false;
			scope.$watch(attrs.content, function(newVal, oldVal) {
				content = newVal;
			})
			scope.$on(showEvent, function() {
				scope.$broadcast('closeOtherPopovers', element);
				if(showing) return;
				showing = true;
				$(element).find('.popover-content div').html(content);
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