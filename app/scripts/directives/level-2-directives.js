'use strict';

angular.module('directives.ue.level-2', [])
.directive('twoDecimalPlaces', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attrs, ngModel) {
			elem.on('blur', function() {
				var input = ngModel.$viewValue;
				if( isNaN( parseFloat( input ) ) ) {
					ngModel.$setViewValue("0.00");
					ngModel.$render();
					return;
				}
				var output = parseFloat(input).toFixed(2);
				ngModel.$setViewValue(output);
				ngModel.$render();
			});
		}
	}
})
.directive('infoButton',['$position', '$timeout', function($position, $timeout){
	//TODO clean out unnecessary code from this directive
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
				naturalUnemployment: '<img src="img/naturalUnemploymentFormula.png" width="311" height="149" />'
			}
			var content = popverContent[attrs.content];
			elem.popover({ content: content, trigger: "hover", html: true, placement: [attrs.placement]});
			$(elem).hover(function(){$(".popover").css({"top": "-25px", "left": "-300px"});});
		}
	};
}).directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
}).directive('piechart', ['$window', '$timeout', function($window, $timeout) {
	//TODO don't think I am actually using $window or $timeout service in this directive
  var link  = function(scope, element, attrs, ctrl) {
    var data = scope.data,
        diameter = scope.options.diameter,
        radius = diameter / 2,
        rotation = scope.options.rotation,
        colorArray = scope.options.colors;

    var color = d3.scale.ordinal()
        .range(colorArray);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });

    var svg = d3.select(element[0]).append("svg") 
        .attr("width", diameter)
        .attr("height", diameter + 80)
        .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ") rotate("+ rotation +")");

    var arcContainer = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    arcContainer.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.category); })
        .style("stroke", "white")
        .style("stroke-width", "4");

    var total = 0;  
    data.forEach(function(d) {
        total += parseInt(d.population);
    });

    arcContainer.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ") rotate(-"+ rotation +")"; })
        .attr("dy", "-1em")
        .attr("dx", "-1em")
        .attr("class", function(d){ return d.data.className + "-percentage-label"})
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "white")
        .style("stroke", "none")
        .style("display", "none")
        .text(function(d) {
         return Math.round(d.data.population/total * 100)+"%"; 
    });

    var legend = svg.append("g")
      .attr("class", "legend")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 100)
      .attr("width", 100)
      .attr("transform","rotate(-"+rotation+")")

    legend.selectAll('g').data(data)
      .enter()
      .append('g')
      .each(function(d,i){
        var g = d3.select(this);
        g.append("rect")
          .attr("x", -80)
          .attr("y", i*25+100)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", function(d) { return colorArray[data.indexOf(d)] })
          .style("stroke", "black")
          .style("stroke-width","1");
           
        g.append("text")
          .attr("class", "legend-label")
          .attr("x", -55)
          .attr("y", i*25 + 114)
          .text(function(d) { return  d.category; });   
      });

  };//end of link function

  return {
    replace: true,
    restrict: 'E',
    scope: {data: '=', options: '='},
    template: '<div></div>',
    link: link
  };

}]);