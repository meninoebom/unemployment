'use strict';

angular.module('directives.ue.level-4', [])
.directive('unemploymentGraph',[function(){
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {
			
			var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 7],
			width = 690,
			height = 538,
			topMargin = 40,
			bottomMargin = 40,
			leftMargin = 40,
			rightMargin = 40,
			y = d3.scale.linear().domain([0, d3.max(data)]).range([0 + topMargin, height - bottomMargin]),
			x = d3.scale.linear().domain([0, data.length]).range([0 + leftMargin, width - rightMargin]);

			var graph = d3.select(element[0]).append("svg:svg")
			    .attr("width", width)
			    .attr("height", height);
			 
			var g = graph.append("svg:g")
			    .attr("transform", "translate(0, "+height+")");

			var line = d3.svg.line()
			    .x(function(d,i) { return x(i); })
			    .y(function(d) { return -1 * y(d); });

			g.append("svg:path").attr("d", line(data))
				.attr("fill","none")
				.attr("stroke","#F00")
				.attr("stroke-width",3);


		}
	}
}]);

angular.module('directives.ue.collapse',['ui.bootstrap.transition'])
//Adapted from the Angular UI framework
// The collapsible directive indicates a block of html that will expand and collapse
.directive('ueCollapse', ['$transition', function($transition) {
  // CSS transitions don't work with height: auto, so we have to manually change the height to a
  // specific value and then once the animation completes, we can reset the height to auto.
  // Unfortunately if you do this while the CSS transitions are specified (i.e. in the CSS class
  // "collapse") then you trigger a change to height 0 in between.
  // The fix is to remove the "collapse" CSS class while changing the height back to auto - phew!
  var fixUpHeight = function(scope, element, height) {
    // We remove the collapse CSS class to prevent a transition when we change to height: auto
    element.removeClass('collapse');
    element.css({ height: height });
    // It appears that  reading offsetWidth makes the browser realise that we have changed the
    // height already :-/
    var x = element[0].offsetWidth;
    element.addClass('collapse');
  };

  return {
    link: function(scope, element, attrs) {
      var targetHeight = attrs.targetHeight + 'px' || 'auto';
      var isCollapsed;
      var initialAnimSkip = true;
      scope.$watch(function (){ return element[0].scrollHeight; }, function (value) {
        //The listener is called when scollHeight changes
        //It actually does on 2 scenarios: 
        // 1. Parent is set to display none
        // 2. angular bindings inside are resolved
        //When we have a change of scrollHeight we are setting again the correct height if the group is opened
        if (element[0].scrollHeight !== 0) {
          if (!isCollapsed) {
            if (initialAnimSkip) {
              fixUpHeight(scope, element, element[0].scrollHeight + 'px');
            } else {
              fixUpHeight(scope, element, targetHeight);
            }
          }
        }
      });
      
      scope.$watch(attrs.ueCollapse, function(value) {
        if (value) {
          collapse();
          console.log('collapse');
        } else {
          expand();
        }
      });
      

      var currentTransition;
      var doTransition = function(change) {
        if ( currentTransition ) {
          currentTransition.cancel();
        }
        currentTransition = $transition(element,change);
        currentTransition.then(
          function() { currentTransition = undefined; },
          function() { currentTransition = undefined; }
        );
        return currentTransition;
      };

      var expand = function() {
        if (initialAnimSkip) {
          initialAnimSkip = false;
          if ( !isCollapsed ) {
            fixUpHeight(scope, element, targetHeight);
          }
        } else {
          doTransition({ height : targetHeight })
          .then(function() {
            // This check ensures that we don't accidentally update the height if the user has closed
            // the group while the animation was still running
            if ( !isCollapsed ) {
              fixUpHeight(scope, element, targetHeight);
            }
          });
        }
        isCollapsed = false;
      };
      
      var collapse = function() {
        isCollapsed = true;
        if (initialAnimSkip) {
          initialAnimSkip = false;
          fixUpHeight(scope, element, 0);
        } else {
          fixUpHeight(scope, element, targetHeight);
          doTransition({'height':'0'});
        }
      };
    }
  };
}]);