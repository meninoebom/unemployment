'use strict';

angular.module('directives.ue.level-4', [])
.directive('unemploymentGraph',['unemploymentDataService',function(unemploymentDataService){
	return {
		restrict: 'C',
    replace: true,
		link: function(scope, element, attrs, ngModel) {
  			
      var redraw = function(xAxisMax, yAxisMax) {
        d3.select(".main-unemp-graph").remove();
    		var margin = {top: 10, right: 12, bottom: 58, left: 67},
        outerWidth = 646,
        outerHeight = 435,
        width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom,
        xAxisMax = xAxisMax + 1, xAxisMin = -12, yAxisMax = yAxisMax || 10;

        var svg = d3.select(element[0]).append("svg")
        .attr("class", "main-unemp-graph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xScale = d3.scale.linear()
          .range([0, width])
          .domain([xAxisMin, xAxisMax]);

        var yScale = d3.scale.linear()
            .range([height, 0])//start from the bottom (height)
            .domain([0, yAxisMax]);

        var convertXPosToMonth = d3.scale.linear() 
          .rangeRound([xAxisMin, xAxisMax])
          .domain([0, width]);

        var colorMap = {
          'purple': '#660066',
          'blue': '#0d5b92',
          'green': '#0f673a'
        }

        var lineStyleMap = {
          'purple': '0',
          'green': '4,2',
          'blue': '4,2,4,2,2,2'
        }

        var stepsBetweenTicks = (function(){
          return Math.round((xAxisMax - xAxisMin) / 13);
        })();

        var tickMarkArray = d3.range(xAxisMin, xAxisMax, stepsBetweenTicks);
        if(_.contains(tickMarkArray, 0) != true) {
          tickMarkArray = _.reject(tickMarkArray, function(num) {
            return Math.abs(num) <= stepsBetweenTicks;
          });
          tickMarkArray.push(0);
        };

    		// Add the x-axis.
    		svg.append("svg:g")
    		      .attr("class", "x axis")
    		      .attr("transform", "translate(0," + height + ")")
              .call(d3.svg.axis()
                  .scale(xScale)
                  .tickSubdivide(3)
                  .tickSize(10, 5, 5)
                  .tickValues(tickMarkArray)
                )
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
                .tickValues(tickMarkArray)
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
                  var distance = d3.event.x - d3.select(this).attr("x1");
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

                var center =  $('.main-unemp-graph').width()/2;
                console.log("newX ="+ newX);
                console.log("center ="+ center);
                if (newX <= center) {
                  console.log("newX <= center");
                  $('.month-dial-popover').css("left", newX+margin.left).removeClass("left").addClass("right");                  
                } else {
                  console.log("newX > center");
                  $('.month-dial-popover').css("left", newX-$('.month-dial-popover').width()+margin.left).removeClass("right").addClass("left");
                }

                //TODO understand why you need apply in this case
                scope.dialPopCurMonth = convertXPosToMonth(newX);
                _.each(scope.selectedPeriods, function(period, index, list){
                  var currentDateFormatted = unemploymentDataService.getCurrentMonthYearFormatted(period.startDate, scope.dialPopCurMonth);
                  period.currentMonthName = currentDateFormatted.monthName;
                  period.currentYear = currentDateFormatted.fullYear;
                  var monthsBefore = period.monthsBefore || 11;
                  var currentDataArrayIndex = scope.dialPopCurMonth + monthsBefore + 1;
                  if(period.data[currentDataArrayIndex]){
                    period.showInPopover = true; 
                    period.currentUnempRate = period.data[currentDataArrayIndex][1];
                    scope.$apply( scope.showInPopover = true );
                  } else {
                    period.showInPopover = false;
                    scope.$apply( scope.showInPopover = false );
                  }
                });
            })
            .on("dragend", function(d,i) {
              var snapToPosDistance = xScale(scope.dialPopCurMonth) - d3.event.x;
              var newX = xScale(scope.dialPopCurMonth);
              d3.select(this)
                  .attr("transform", function(d,i){
                      return "translate(" + [ snapToPosDistance,0 ] + ")"
                  })
                  .attr("x1", newX)
                  .attr("x2", newX);
            });

          var monthScroller = svg.append("line")
              .attr("class", "month-dial")
              .attr("x1", xScale(0))
              .attr("y1", height)
              .attr("x2", xScale(0))
              .attr("y2", -5)
              .attr("fill","none")
              .attr("stroke","#F00")
              .attr("stroke-width",3)
              .attr("marker-end", "url(#triangle-start)")
               .call(drag);

          $(".month-dial").on("mousedown", function(){
              if(scope.selectedPeriods.length) scope.$apply(scope.showMonthDialPopover = true);
          })
          $("body").on('mouseup.hideMonthDialPopover', function () { 
            scope.$apply(scope.showMonthDialPopover = false) 
          });

          var drawGraphLine = function(data, color, lineStyle, index) {
            var line = d3.svg.line()
              .x(function(d) { return xScale(d[0]); })
              .y(function(d) { return yScale(d[1]); }); 
            svg.append("svg:path")
               .datum(data)
               .attr("index", index)
               .attr("class", "line graph-line")
               .attr("d", line)
               .attr("fill","none")
               .attr("stroke", color)
               .attr("stroke-width",4)
               .style("stroke-dasharray", (lineStyle));
          }

          _.each(scope.selectedPeriods, function(period, index, list) {
            period.data = unemploymentDataService.getData(period.startDate, period.endDate, period.monthsBefore);
            drawGraphLine(period.data, colorMap[period.color], lineStyleMap[period.color], index );
          });
          
          $(".graph-line").on("mousemove", function(e){ 
              var $popover = $('.detail-popover');
              var relativeX = e.pageX - $(this).parent().parent().offset().left - margin.left;
              var relativeY = e.pageY - $(this).parent().parent().offset().top - margin.top;
              scope.detailPopCurMonth  = convertXPosToMonth(relativeX);
              var popoverHeight = $popover.height();
              var popoverWidth = $popover.width();
              $popover.css("left", relativeX - popoverWidth + 60).css("top", relativeY - popoverHeight*.75);
              
              var index = $(this).attr("index");
              var period = {};
              period.name = scope.selectedPeriods[index].name;
              var currentDateFormatted = unemploymentDataService.getCurrentMonthYearFormatted(scope.selectedPeriods[index].startDate, scope.detailPopCurMonth);
              var monthsBefore = scope.selectedPeriods[index].monthsBefore || 12;
              var currentDataArrayIndex = scope.detailPopCurMonth + monthsBefore;
              period.currentMonthName = currentDateFormatted.monthName;
              period.currentYear = currentDateFormatted.fullYear;
              period.currentUnempRate = scope.selectedPeriods[index].data[currentDataArrayIndex][1];
              period.color = scope.selectedPeriods[index].color;
              scope.detailPeriod = {
                'name': period.name,
                'currentMonthName': period.currentMonthName, 
                'currentYear': period.currentYear, 
                'currentUnempRate': period.currentUnempRate,
                'color': period.color
              };

              scope.$apply( scope.showDetailPopover = true ); 
          }).on('mouseout', function () { 
              scope.$apply( scope.showDetailPopover = false ); 
          });
        }// end of redraw()

        scope.$watch("selectedPeriods.length", function() {
          var periodsSortedByLongest = _.sortBy(scope.selectedPeriods, function(period) {
            return unemploymentDataService.calculateMonthsBetween(period.startDate, period.endDate);
          });
          var longestPeriod = periodsSortedByLongest.length ? periodsSortedByLongest[periodsSortedByLongest.length-1] : undefined;
          var xAxisMax = longestPeriod ? unemploymentDataService.calculateMonthsBetween(longestPeriod.startDate, longestPeriod.endDate) : 12;
          var highestUnempRates = [];
          _.each(scope.selectedPeriods, function(period, index, list) {
            var arrayWithHighestVal = _.max(period.data, function(member) { return member[1]; })
            highestUnempRates.push(arrayWithHighestVal[1]);
          })
          var yAxisMax = (_.max(highestUnempRates) > 0) ? _.max(highestUnempRates) : 10;
          redraw(xAxisMax, yAxisMax);
        });

        //redraw();
  		}// end link function
	  }// end returned object
}])
.directive('detailPopoverPiechart', [function() {
  return {
    restrict: 'AC',
    link: function(scope, element, attrs) {
     
      scope.$watch(attrs.currentUnempRate, function(currentUnempRate) {
        if(currentUnempRate === undefined) return;
        element.empty();
        var unempRate = currentUnempRate;
        var empRate = 100 - unempRate;
        
        var data =   [
          {"category": "Employed", "population": empRate, "className": "employed"},
          {"category": "Unemployed", "population": unempRate, "className": "unemployed"}
        ]

        var colorMap = {
          'blue': ["#0d5b92", "#70caf2"],
          'purple': ["#660066", "#dcb3ff"],
          'green': ["#0f673a", "#8ec859"]
        }
        
        var options = {
          diameter: 150,
          rotation: 12,
          colors: colorMap[attrs.color]
        };
        
        var diameter = options.diameter,
            radius = diameter / 2,
            rotation = options.rotation,
            colorArray = options.colors;

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
            .attr("height", diameter)
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
            .text(function(d) {
             return Math.round(d.data.population/total * 100)+"%"; 
            });
      });
    }
  }
}]);//end of directive

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