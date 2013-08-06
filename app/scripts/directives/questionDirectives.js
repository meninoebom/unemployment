'use strict';

angular.module('questionDirectives', [])
.directive('showFormula', function(){
    return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
			var content = '<img src="img/laborForceParticipationFormula.png" width="311" height="149" />'
			


			elem.popover({ content: content, trigger: "click", html: true, placement: "bottom" });
		}
	};
}).directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
});