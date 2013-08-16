'use strict';

angular.module('level-2-directives-module', [])
.directive('infoButton',['$position', '$timeout', function($position, $timeout){
	return {
		restrict: 'AC',
		scope: true,
		link: function(scope, element, attrs) {
			// Default hide triggers for each show trigger
			var triggerMap = {
				'mouseenter': 'mouseleave',
				'click': 'click',
				'focus': 'blur'
			};
			function getTriggers ( trigger ) {
		        var show = trigger || 'click';
		        var hide = triggerMap[show] || show;
		        return {
		          show: show,
		          hide: hide
		        };
		     }
			var transitionTimeout;
			var popupTimeout;
			var $body;
			var appendToBody = false;
			var triggers = getTriggers( undefined );
			var hasRegisteredTriggers = false;
			var prefix = 'info';
			var tooltip = element.find('.popover');

	          // By default, the tooltip is not open.
	          // TODO add ability to start tooltip opened
	          scope.tt_isOpen = false;

	          function toggleTooltipBind () {
	            if ( ! scope.tt_isOpen ) {
	              showTooltipBind();
	            } else {
	              hideTooltipBind();
	            }
	          }
	          
	          // Show the tooltip with delay if specified, otherwise show it immediately
	          function showTooltipBind() {
	            if ( scope.tt_popupDelay ) {
	              popupTimeout = $timeout( show, scope.tt_popupDelay );
	            } else {
	              scope.$apply( show );
	            }
	          }

	          function hideTooltipBind () {
	            scope.$apply(function () {
	              hide();
	            });
	          }
	          
	          // Show the tooltip popup element.
	          function show() {
	            var position,
	                ttWidth,
	                ttHeight,
	                ttPosition;

	            // If there is a pending remove transition, we must cancel it, lest the
	            // tooltip be mysteriously removed.
	            if ( transitionTimeout ) {
	              $timeout.cancel( transitionTimeout );
	            }
	            
	            // Set the initial positioning.
	            tooltip.css({ top: 0, left: 0, display: 'block' });
	            
	            // Now we add it to the DOM because need some info about it. But it's not 
	            // visible yet anyway.
	            if ( appendToBody ) {
	                $body = $body || $document.find( 'body' );
	                $body.append( tooltip );
	            } else {
	              element.after( tooltip );
	            }

	            // Get the position of the directive element.
	            position = appendToBody ? $position.offset( element ) : $position.position( element );

	            // Get the height and width of the tooltip so we can center it.
	            ttWidth = tooltip.prop( 'offsetWidth' );
	            ttHeight = tooltip.prop( 'offsetHeight' );
	            
	            // Calculate the tooltip's top and left coordinates to center it with
	            // this directive.
	            switch ( scope.tt_placement ) {
	              case 'mouse':
	                var mousePos = $position.mouse();
	                ttPosition = {
	                  top: mousePos.y,
	                  left: mousePos.x
	                };
	                break;
	              case 'right':
	                ttPosition = {
	                  top: position.top + position.height / 2 - ttHeight / 2,
	                  left: position.left + position.width
	                };
	                break;
	              case 'bottom':
	                ttPosition = {
	                  top: position.top + position.height,
	                  left: position.left + position.width / 2 - ttWidth / 2
	                };
	                break;
	              case 'left':
	                ttPosition = {
	                  top: position.top + position.height / 2 - ttHeight / 2,
	                  left: position.left - ttWidth
	                };
	                break;
	              default:
	                ttPosition = {
	                  top: position.top - ttHeight,
	                  left: position.left + position.width / 2 - ttWidth / 2
	                };
	                break;
	            }

	            ttPosition.top += 'px';
	            ttPosition.left += 'px';

	            // Now set the calculated positioning.
	            tooltip.css( ttPosition );
	              
	            // And show the tooltip.
	            scope.tt_isOpen = true;
	          }
	          
	          // Hide the tooltip popup element.
	          function hide() {
	            // First things first: we don't show it anymore.
	            scope.tt_isOpen = false;

	            //if tooltip is going to be shown after delay, we must cancel this
	            $timeout.cancel( popupTimeout );
	            
	            tooltip.remove();
	          }

           /**
           * Observe the relevant attributes.
           */
          attrs.$observe( prefix+'Title', function ( val ) {
            scope.tt_title = val;
          });

          attrs.$observe( prefix+'Placement', function ( val ) {
            scope.tt_placement = angular.isDefined( val ) ? val : 'top';
          });

          attrs.$observe( prefix+'PopupDelay', function ( val ) {
            var delay = parseInt( val, 10 );
            scope.tt_popupDelay = ! isNaN(delay) ? delay : 0;
          });

          attrs.$observe( prefix+'Trigger', function ( val ) {

            if (hasRegisteredTriggers) {
              element.unbind( triggers.show, showTooltipBind );
              element.unbind( triggers.hide, hideTooltipBind );
            }

            triggers = getTriggers( val );

            if ( triggers.show === triggers.hide ) {
              element.bind( triggers.show, toggleTooltipBind );
            } else {
              element.bind( triggers.show, showTooltipBind );
              element.bind( triggers.hide, hideTooltipBind );
            }

            hasRegisteredTriggers = true;
          });

          attrs.$observe( prefix+'AppendToBody', function ( val ) {
            appendToBody = angular.isDefined( val ) ? $parse( val )( scope ) : appendToBody;
          });

          // if a tooltip is attached to <body> we need to remove it on
          // location change as its parent scope will probably not be destroyed
          // by the change.
          if ( appendToBody ) {
            scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess () {
            if ( scope.tt_isOpen ) {
              hide();
            }
          });
          }

          // Make sure tooltip is destroyed and removed.
          scope.$on('$destroy', function onDestroyTooltip() {
            if ( scope.tt_isOpen ) {
              hide();
            } else {
              tooltip.remove();
            }
          });
		}
	}
}])
.directive('showFormula', function(){
    return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
			var popverContent = {
				laborForceParticipation: '<img src="img/laborForceParticipationFormula.png" width="311" height="149" />',
				employment: '<img src="img/employmentRateFormula.png" width="311" height="149" />',
				unemployment: '<img src="img/unemploymentRateFormula.png" width="311" height="149" />',
				naturalUnemployment: '<img src="img/unemploymentRateFormula.png" width="311" height="149" />'
			}
			var content = popverContent[attrs.content];
			elem.popover({ content: content, trigger: "hover", html: true});
		}
	};
}).directive('wrongAnswerPopover', function(){
    return {
		restrict: 'A',
		replace: true,
		link: function(scope, elem, attrs, ctrl) {
			var content;
			var contentObj = [
				'The labor force participation rate is the percentage of the people in the non-institutional adult population who are in the labor force.',
				'The labor force participation rate is the percentage of the people in the non-institutional adult population who are in the labor force.<img src="img/employment-rate-second-hint.png">',
				'The labor force participation rate is the percentage of the people in the non-institutional adult population who are in the labor force.[image of equation goes here][equation calculator goes here]'
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
}).directive('equationTool', ['$http', '$templateCache', '$compile', function($http, $templateCache, $compile) {
	return {
		restrict: 'A',
		scope: { test:'@' },
		link: function(scope, element, attrs, ctrl) {
			var src = attrs.equationTool, content;
			$http.get(src, {cache: $templateCache}).success(function(response){
				content = response;
			}).error();
			$(element).click(function(event) { 
				event.preventDefault();
				var $elem = $(this);
				$elem.popover({ 
					content: content, trigger: "manual", html: true, placement: "top", 
					template: '<div class="popover equation-tool-popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div><img class="popover-close-button" src="img/popover_close.png" width="25" height="25" /></div>'
				});
				$elem.popover('show');	
				var compiled = $compile($elem.next('.popover').find('.popover-content'))(scope);
				$elem.next('.popover').find('.popover-close-button').click(function(event) {
					$elem.popover('destroy');
				});	
			});
		}
	}
}]);