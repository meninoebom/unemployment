'use strict';

angular.module('directives.ue.level-4', [])
.directive('unemploymentGraph',['unemploymentDataService',function(unemploymentDataService){
	return {
		restrict: 'A',
    replace: true,
		link: function(scope, element, attrs, ngModel) {
  			
  		var margin = {top: 10, right: 12, bottom: 58, left: 67},
      outerWidth = 646,
      outerHeight = 435,
      width = outerWidth - margin.left - margin.right,
      height = outerHeight - margin.top - margin.bottom;

      var svg = d3.select(element[0]).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var xScale = d3.scale.linear()
        .range([0, width])
        .domain([-12, 132]);

      var yScale = d3.scale.linear()
          .range([height, 0])//start from the bottom (height)
          .domain([0, 26]);

      var convertXPosToMonth = d3.scale.linear() 
        .rangeRound([-12, 132])
        .domain([0, width]);

  		// Add the x-axis.
  		svg.append("svg:g")
  		      .attr("class", "x axis")
  		      .attr("transform", "translate(0," + height + ")")
            .call(d3.svg.axis()
                .scale(xScale)
                .tickSubdivide(3)
                .tickSize(10, 5, 5)
                .tickValues([-12,0,12,24,36,48,60,72,84,96,108,120,132]))
            .append("text")
            .attr("x", width/2)
            .attr("y", 50)
            .attr("dx", ".71em")
            .style("text-anchor", "middle")
            .text("Month (Month 0 indicates official start of recession)");

      //Add inner ticks
      svg.append("svg:g")         
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.svg.axis()//create the actual axis
              .scale(xScale)
              .orient("top")
              .tickSubdivide(3)
              .tickSize(10, 5, 5)
              .tickValues([-12,0,12,24,36,48,60,72,84,96,108,120,132])
              .tickFormat("")
          );

  		// create y axis
  		svg.append("svg:g")
  	      .attr("class", "y axis")
  	      .call(d3.svg.axis()//create the actual axis
            .scale(yScale)
            .ticks(13)
            .tickSize(-width, -width, 0)
            .tickSubdivide(true)
            .orient("left")
          )
          .append("text") //Add the axis label
          .attr("transform", "rotate(-90)")
          .attr("y", -45)
          .attr("x", -height/2)
          .attr("dy", ".71em")
          .style("text-anchor", "middle")
          .text("Unemployement Rate (% of Labor Force)");
      
      svg.select(".y.axis")
          .selectAll(".tick")
          .style("stroke-dasharray", ("2, 2"));

      var defs = svg.append("defs");

      defs.append("marker")
          .attr("id", "triangle-start")
          .attr("viewBox", "0 0 10 10")
          .attr("refX", 10)
          .attr("refY", 5)
          .attr("markerWidth", -6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
        .append("path")
          .attr("d", "M 0 0 L 10 5 L 0 10 z");

      defs.append("marker")
          .attr("id", "triangle-end")
          .attr("viewBox", "0 0 10 10")
          .attr("refX", 10)
          .attr("refY", 5)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
        .append("path")
          .attr("d", "M 0 0 L 10 5 L 0 10 z");

      var drag = d3.behavior.drag()
          .origin(function() { 
              var t = d3.select(this);
              return {x: t.attr("x1"), y: t.attr("y")};
          })
          .on("drag", function(d,i) {
            var newX;
            if(d3.event.x > 0 && d3.event.x < width){
                var distance = d3.event.x-d3.select(this).attr("x1");
                newX = parseInt(d3.select(this).attr("x1")) + distance;
            } else if(d3.event.x <= 0) {
               newX = 0;

            } else if(d3.event.x >= width) {
                newX = width;
            }
              d3.select(this)
                .attr("transform", function(d,i){
                    return "translate(" + [ distance,0 ] + ")"
                })
                .attr("x1", newX)
                .attr("x2", newX);
                scope.$apply(scope.currentMonth = convertXPosToMonth(newX));
          });

      scope.currentMonth = 0;

      var timeScroll = svg.append("line")
          .attr("class", "scrub-bar")
          .attr("x1", xScale(0))
          .attr("y1", height)
          .attr("x2", xScale(0))
          .attr("y2", -5)
          .attr("fill","none")
          .attr("stroke","#F00")
          .attr("stroke-width",3)
          .attr("marker-end", "url(#triangle-start)")
          .call(drag);

      $(".scrub-bar").on("mousedown", function(){
          if(scope.selectedPeriods.length) scope.$apply(scope.showScrubBarPopover = true);
      })
      $("body").on('mouseup.hideScrubBarPopover', function () { scope.$apply(scope.showScrubBarPopover = false) });

      var graphLine = {
        draw: function(data, color, lineStyle) {
          var line = d3.svg.line()
            .x(function(d) { return xScale(d[0]); })
            .y(function(d) { return yScale(d[1]); }); 
          svg.append("svg:path")
             .datum(data)
             .attr("class", "line graph-line")
             .attr("d", line)
             .attr("fill","none")
             .attr("stroke", color)
             .attr("stroke-width",4)
             .style("stroke-dasharray", (lineStyle));
        }
      }

      var colorMap = {
        'purple': '#660066',
        'blue': '#0d5b92',
        'green': '#0f673a'
      }

      var lineStyleMap = [
        '4,2',
        '4,2,4,2,2,2',
        '0'
      ]

      scope.$watch("selectedPeriods", function() {
        svg.selectAll(".graph-line").remove();        
        _.each(scope.selectedPeriods, function(element, index, list) {
          ///////////////////////////////////////////////////////
          //Get data from service using name, startDate, and endDate of current selected periods
          ///////////////////////////////////////////////////////
          var data = unemploymentDataService.getData(element.startDate, element.endDate, 12);
          graphLine.draw(data, colorMap[element.color], lineStyleMap[index] );
        })
      }, true);

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