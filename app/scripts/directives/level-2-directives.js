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
}).directive('wrongAnswerPopover', function(responseHandler){
    return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
			var content;
			var contentObj = [
				'The labor force participation rate is the percentage of teh people in the non-institutional adult population who are in teh labor force.',
				'The labor force participation rate is the percentage of teh people in the non-institutional adult population who are in teh labor force.[image of equation goes here]',
				'The labor force participation rate is the percentage of teh people in the non-institutional adult population who are in teh labor force.[image of equation goes here][equation calculator goes here]'
			]
			
			var called = false;
			scope.$on('showHint', function() {
				if (scope.numAttempts < 3) {
					content = contentObj[scope.numAttempts - 1]
				} else {
					content = contentObj[2]
				}    
				if (called) {
					elem.popover('destroy');
				}
				called = true;
                elem.popover({ 
					content: content, trigger: "manual", html: true, placement: "top", 
					template: '<div class="popover incorrect-answer-popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><img src="img/indicator_alert.png" class="alert-icon" width="44" height="45" /><div class="popover-content"><p></p></div></div><img class="popover-close-button" src="img/popover_close.png" width="25" height="25" /></div>'
				});
				elem.popover('show');	
				angular.element('.popover-close-button').bind('click', function() {
					elem.popover('destroy');
				});				
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