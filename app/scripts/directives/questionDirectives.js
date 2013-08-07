'use strict';

angular.module('questionDirectives', [])
.directive('showFormula', function(){
    return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
			var popverContent = {
				laborForceParticipation: '<img src="img/laborForceParticipationFormula.png" width="311" height="149" />'
			}
			var content = popverContent[attrs.content];
			elem.popover({ content: content, trigger: "hover", html: true, placement: "bottom" });
		}
	};
}).directive('showWrongRight', function(){
    return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
			elem.popover({ content: 'test', trigger: "manual", html: true, placement: "top", 
				template: '<div class="popover incorrect-answer-popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>' });
			elem.bind('blur', function() {
				elem.popover('show');
			});
		}
	};
}).directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
});