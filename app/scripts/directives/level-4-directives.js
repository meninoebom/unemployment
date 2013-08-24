'use strict';

angular.module('directives.ue.level-4', [])
.directive('unemploymentGraph',[function(){
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {
			
			var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 9, 9, 9],
			margin = {top: 20, right: 20, bottom: 30, left: 50},
			width = 600,
			height = 400,
			yScale = d3.scale.linear().domain([0, d3.max(data)]).range([0 + margin.top, height - margin.bottom]),
			xScale = d3.scale.linear().domain([0, data.length]).range([0 + margin.left, width - margin.right]);

			var svg = d3.select(element[0]).append("svg:svg")
			    .attr("width", width)
			    .attr("height", height);

			var g = svg.append("svg:g")
			    .attr("transform", "translate(0, "+height+")"); //push it down or else it shows up above the upper limit

	 



			var line = d3.svg.line()
			    .x(function(d,i) { return xScale(i); })
			    .y(function(d) { return -1 * yScale(d); }); //flip on the x axis



			// var xAxis = d3.svg.axis()
			//   .scale(xScale)
			//   .orient("bottom");

			// var yAxis = d3.svg.axis()
			//   .scale(yScale)
			//   .orient("left");		

			// create xAxis
			var xAxis = d3.svg.axis().scale(xScale);
			// Add the x-axis.
			svg.append("svg:g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + 100 + ")")
			      .call(xAxis);
 
 
			// create left yAxis
			var yAxisLeft = d3.svg.axis().scale(yScale).tickSize(-height).tickSubdivide(true).orient("left");
			// Add the y-axis to the left
			svg.append("svg:g")
			      .attr("class", "y axis")
			      .attr("transform", "translate(100,100)")
			      .call(yAxisLeft);

			g.append("svg:path").attr("d", line(data))
				.attr("fill","none")
				.attr("stroke","#F00")
				.attr("stroke-width",3).style("stroke-dasharray", ("4, 2"));



			// svg.append("g")
			//   .attr("class", "x axis")
			//   .attr("transform", "translate(0," + height + ")")
			//   .call(xAxis);

			// svg.append("g")
			//   .attr("class", "y axis")
			//   .call(yAxis)
			//   .append("text")
			//   .attr("transform", "rotate(-90)")
			//   .attr("y", 10)
			//   .attr("x", -height/2)
			//   .attr("dy", ".71em")
			//   .style("text-anchor", "middle")
			//   .text("Unemployement Rate (% of Labor Force)");

			// svg.append("g")
			//   .attr("class", "x axis")
			//   .call(yAxis)
			//   .append("text")
			//   .attr("x", width/2)
			//   .attr("y", height)
			//   .attr("dx", ".71em")
			//   .style("text-anchor", "middle")
			//   .text("Month (Month 0 indicates official start of recession)");

			//d3.select("axis path, axis line").attr("fill","none");
			//d3.select("path.domain").attr("stroke","#000");
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