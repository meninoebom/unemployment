'use strict';

angular.module('directives.ue.level-3', [])
.directive('level3Graph',['unemploymentDataService',function(unemploymentDataService){
	return {
		restrict: 'C',
    replace: true,
		link: function(scope, element, attrs, ngModel) {
  			
      var redrawEntireGraph = function(xAxisMax, yAxisMax) {
        d3.select(".main-unemp-graph").remove();
    	var margin = {top: 10, right: 12, bottom: 58, left: 67},
        outerWidth = 646,
        outerHeight = 435,
        width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom,
        xAxisMax = 2013, xAxisMin = 2000, yAxisMax = yAxisMax || 10;

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
          'us': '4,2',
          'state': '4,2,4,2,2,2',
          'county1': '0',
          'county2': '3,2'
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
                var $popover = $('.month-dial-popover');
                if (newX <= center) {
                  $popover.css("left", newX+margin.left).removeClass("left").addClass("right");                  
                } else {
                  $popover.css("left", newX-$popover.width()+margin.left).removeClass("right").addClass("left");
                }

                scope.$apply(function(){
                  scope.dialPopCurMonth.val = convertXPosToMonth(newX);
                  _.each(scope.selectedPeriods, function(period, index, list){
                    var currentDateFormatted = unemploymentDataService.getCurrentMonthYearFormatted(period.startDate, scope.dialPopCurMonth.val);
                    var monthsBefore = period.monthsBefore || 11;
                    var currentDataArrayIndex = scope.dialPopCurMonth.val + monthsBefore + 1;
                    period.currentMonthName = currentDateFormatted.monthName;
                    period.currentYear = currentDateFormatted.fullYear;
                    if(period.unemploymentData[currentDataArrayIndex]){
                      period.showInPopover = true; 
                      period.currentUnempRate = period.unemploymentData[currentDataArrayIndex][1];
                      period.currentLFPRate = (period.laborForceData[currentDataArrayIndex]) ? period.laborForceData[currentDataArrayIndex][1] : '';
                      scope.showInPopover = true;
                    } else {
                      period.showInPopover = false;
                      scope.showInPopover = false;
                    }
                  });
                });
            })
            .on("dragend", function(d,i) {
              var snapToPosDistance = xScale(scope.dialPopCurMonth.val) - d3.event.x;
              var newX = xScale(scope.dialPopCurMonth.val);
              d3.select(this)
                  .attr("transform", function(d,i){
                      return "translate(" + [ snapToPosDistance,0 ] + ")"
                  })
                  .attr("x1", newX)
                  .attr("x2", newX);
            });

          var drawMonthDial = function(month) {
              d3.select(".month-dial").remove();
              var dial = svg.append("line")
              .attr("class", "month-dial")
              .attr("x1", xScale(month))
              .attr("y1", height)
              .attr("x2", xScale(month))
              .attr("y2", -5)
              .attr("fill","none")
              .attr("stroke","#F00")
              .attr("stroke-width",3)
              .attr("marker-end", "url(#triangle-start)")
              .call(drag);
          }
          drawMonthDial(2006);

          $(".month-dial").on("mousedown", function(e){
              var $popover = $('.month-dial-popover');
              var relativeX = e.pageX - $(this).parent().parent().offset().left - margin.left;
              var relativeY = e.pageY - $(this).parent().parent().offset().top - margin.top;
              var popoverHeight = $popover.height();
              var popoverWidth = $popover.width();
              var center =  $('.main-unemp-graph').width()/2;
              scope.detailPopCurMonth.val  = convertXPosToMonth(relativeX);
              $popover.css("left", relativeX - popoverWidth + 60).css("top", relativeY - popoverHeight*.5);
              if (relativeX <= center) {
                $popover.css("left", relativeX + margin.left).removeClass("left").addClass("right");                  
              } else {
                $popover.css("left", relativeX - $popover.width()+margin.left).removeClass("right").addClass("left");
              }
              if(scope.selectedPeriods.length) scope.$apply(scope.showMonthDialPopover = true);
          })
          $("body").on('mouseup.hideMonthDialPopover', function () { 
            scope.$apply(scope.showMonthDialPopover = false) 
          });

          scope.$on('moveMonthDial', function() {
            drawMonthDial(scope.dialPopCurMonth.val);
          })

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

          		_.each(scope.selectedRegions, function(element, index, list){
          			drawGraphLine(element.data, colorMap[element.color], element.lineStyle,1);
          		});
         
          $(".graph-line").on("mousemove", function(e){ 
              var $popover = $('.detail-popover');
              var relativeX = e.pageX - $(this).parent().parent().offset().left - margin.left;
              var relativeY = e.pageY - $(this).parent().parent().offset().top - margin.top;
              var popoverHeight = $popover.height();
              var popoverWidth = $popover.width();
              var center =  $('.main-unemp-graph').width()/2;

              scope.detailPopCurMonth.val  = convertXPosToMonth(relativeX);
              $popover.css("left", relativeX - popoverWidth + 60).css("top", relativeY - popoverHeight*.5);
              if (relativeX <= center) {
                $popover.css("left", relativeX + margin.left).removeClass("left").addClass("right");                  
              } else {
                $popover.css("left", relativeX - $popover.width()+margin.left).removeClass("right").addClass("left");
              }

              var index = $(this).attr("index");
              var period = {};
              period.name = scope.selectedPeriods[index].name;
              var currentDateFormatted = unemploymentDataService.getCurrentMonthYearFormatted(scope.selectedPeriods[index].startDate, scope.detailPopCurMonth.val);
              var monthsBefore = scope.selectedPeriods[index].monthsBefore || 12;
              var currentDataArrayIndex = scope.detailPopCurMonth.val + monthsBefore;
              period.currentMonthName = currentDateFormatted.monthName;
              period.currentYear = currentDateFormatted.fullYear;
              period.currentUnempRate = scope.selectedPeriods[index].unemploymentData[currentDataArrayIndex][1];
              period.currentLFPRate = (scope.selectedPeriods[index].laborForceData[currentDataArrayIndex]) ? scope.selectedPeriods[index].laborForceData[currentDataArrayIndex][1] : '';
              period.color = scope.selectedPeriods[index].color;
              scope.detailPeriod = {
                'name': period.name,
                'currentMonthName': period.currentMonthName, 
                'currentYear': period.currentYear, 
                'currentUnempRate': period.currentUnempRate,
                'currentLFPRate': period.currentLFPRate,
                'color': period.color
              };

              scope.$apply( scope.showDetailPopover = true ); 
          }).on('mouseout', function () { 
              scope.$apply( scope.showDetailPopover = false ); 
          });
        }// end of redrawEntireGraph()

        redrawEntireGraph(2013, 20);

        	scope.$watch('graphLines', function() {
          		redrawEntireGraph(2013, 20);
			}, true);
         

        // scope.$watch("lastMonthVisible + highestVisibleRate + selectedPeriods.length", function() {
        //   redrawEntireGraph(scope.lastMonthVisible, scope.highestVisibleRate);
        // });

  		}// end link function
	  }// end returned object
}]);