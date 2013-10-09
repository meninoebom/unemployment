'use strict';

angular.module('directives.ue.level-3', [])
.directive('level3MonthSlider',['unemploymentDataService',function(unemploymentDataService){
	return {
		restrict: 'C',
    	replace: true,
		link: function(scope, element, attrs, ngModel) {
	  			
		     var redrawSlider = function(xAxisMax, yAxisMax) {
		        d3.select(".month-slider-container").remove();
		    	var margin = {top: 30, right: 20, bottom: 30, left:20},
		        outerWidth = 646,
		        outerHeight = 60,
		        width = outerWidth - margin.left - margin.right,
		        height = outerHeight - margin.top - margin.bottom,
		        xAxisMax = xAxisMax, xAxisMin = 2000, yAxisMax = yAxisMax || 10;

		        var svg = d3.select(element[0]).append("svg")
		        .attr("class", "month-slider-container")
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
		          .range([xAxisMin, xAxisMax])
		          .domain([0, width]);

		        var convertXPosToFormattedDate = function(xPos) {
		        	var formattedDate = {};
		        	var dateAsDecimal = convertXPosToMonth(xPos);
	                var dateArray = String(dateAsDecimal).split(".") 
	                var y = dateArray[0];
	                var rawMonthOffset = dateAsDecimal - y;
	                var interpolatedMonthOffset = Math.floor(rawMonthOffset*12);
					var epoch = y*12;
					epoch += interpolatedMonthOffset;
					var m1 = epoch % 12;
					formattedDate.year = (epoch - m1)/12;
					formattedDate.month = m1+1;
					return formattedDate;
		        }

		        var getDateAsDecimal = function() {
		        	return scope.dataSpec.year + (scope.dataSpec.month/12);
		        }

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

		        //Take out tickmarks near 0 because they are visually disruptive
		        var tickMarkArray = d3.range(xAxisMin, xAxisMax, stepsBetweenTicks);
		    
				// Add the x-axis.
				svg.append("svg:g")
			        .attr("class", "x axis")
			        .attr("transform", "translate(0," + height + ")")
		            .call(d3.svg.axis()
		                .scale(xScale)
		                .tickSubdivide(3)
		                .tickSize(10, 5, 5)
		                .tickValues(tickMarkArray)
		                .tickFormat(function(d) {
		                	var noComma = d3.format("f");
		                	return noComma(d);
		                })
		            )

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

		                var center =  $('.month-slider-container').width()/2;
		                var $popover = $('.month-dial-popover');
		                if (newX <= center) {
		                  $popover.css("left", newX+margin.left).removeClass("left").addClass("right");                  
		                } else {
		                  $popover.css("left", newX-$popover.width()+margin.left).removeClass("right").addClass("left");
		                }

		                var formattedDate = convertXPosToFormattedDate(newX);

		                scope.$apply(function(){
		                	scope.dataSpec.month = formattedDate.month;
		                	scope.dataSpec.year = formattedDate.year;
		                });
		            })
		            .on("dragend", function(d,i) {
		              var rawDateNum = getDateAsDecimal();
		              var newX = xScale(rawDateNum);
		              var snapToPosDistance = newX - d3.event.x;
		              d3.select(this)
		                  .attr("transform", function(d,i){
		                      return "translate(" + [ snapToPosDistance,0 ] + ")"
		                  })
		                  .attr("x1", newX)
		                  .attr("x2", newX);
		            });

			        var defs = d3.select("svg").append("defs")

			        defs.append("marker")
			            .attr("id", "map-dial-triangle-start")
			            .attr("viewBox", "0 0 10 10")
			            .attr("refX", 10)
			            .attr("refY", 5)
			            .attr("markerWidth", -6)
			            .attr("markerHeight", 6)
			            .attr("orient", "auto")
			          	.append("path")
			            .attr("d", "M 0 0 L 10 5 L 0 10 z");

			        defs.append("marker")
			            .attr("id", "map-dial-triangle-end")
			            .attr("viewBox", "0 0 10 10")
			            .attr("refX", 10)
			            .attr("refY", 5)
			            .attr("markerWidth", 6)
			            .attr("markerHeight", 6)
			            .attr("orient", "auto")
			          	.append("path")
			            .attr("d", "M 0 0 L 10 5 L 0 10 z");

					var drawMonthDial = function(month) {
						  d3.select(".month-slider").remove();
						  var dial = svg.append("line")
						  .attr("class", "month-slider")
						  .attr("x1", xScale(month))
						  .attr("y1", height-20)
						  .attr("x2", xScale(month))
						  .attr("y2", height)
						  .attr("fill","none")
						  .attr("stroke","#F00")
						  .attr("stroke-width",10)
						  .attr("marker-end", "url(#map-dial-triangle-end)")
						  .call(drag);
					}
					drawMonthDial(getDateAsDecimal());

					$(".month-slider").on("mousedown", function(e){
						  var $popover = $('.month-dial-popover');
						  var relativeX = e.pageX - $(this).parent().parent().offset().left - margin.left;
						  var relativeY = e.pageY - $(this).parent().parent().offset().top - margin.top;
						  var popoverHeight = $popover.height();
						  var popoverWidth = $popover.width();
						  var center =  $('.month-slider-container').width()/2;
						  
						  $popover.css("left", relativeX - popoverWidth + 60).css("top", 20);
						  if (relativeX <= center) {
						    $popover.css("left", relativeX + margin.left).removeClass("left").addClass("right");                  
						  } else {
						    $popover.css("left", relativeX - $popover.width()+margin.left).removeClass("right").addClass("left");
						  }
						  if(scope.selectedRegions.length) scope.$apply(scope.showMonthDialPopover = true);
					})
					$("body").on('mouseup.hideMonthDialPopover', function () { 
						scope.$apply(scope.showMonthDialPopover = false) 
					});
		    }// end of redrawSlider()
	         
	        scope.$watch("selectedRegions", function() {
	        	var endDate = scope.dataSpec.latestDateAvailable.year +"-"+ scope.dataSpec.latestDateAvailable.month;
	        	var endDateInDecimalForm = unemploymentDataService.calculateDateAsDecimal(endDate);
	          	redrawSlider( endDateInDecimalForm, scope.highestVisibleRate);
	        });

	  	}// end link function
    }// end returned object
}])
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
		        xAxisMax = xAxisMax, xAxisMin = 2000, yAxisMax = yAxisMax || 10;

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
		          .range([xAxisMin, xAxisMax])
		          .domain([0, width]);

		        var convertXPosToFormattedDate = function(xPos) {
		        	var formattedDate = {};
		        	var dateAsDecimal = convertXPosToMonth(xPos);
	                var dateArray = String(dateAsDecimal).split(".") 
	                var y = dateArray[0];
	                var rawMonthOffset = dateAsDecimal - y;
	                var interpolatedMonthOffset = Math.floor(rawMonthOffset*12);
					var epoch = y*12;
					epoch += interpolatedMonthOffset;
					var m1 = epoch % 12;
					formattedDate.year = (epoch - m1)/12;
					formattedDate.month = m1+1;
					return formattedDate;
		        }

		        var getDateAsDecimal = function() {
		        	return scope.dataSpec.year + (scope.dataSpec.month/12);
		        }

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

		        //Take out tickmarks near 0 because they are visually disruptive
		        var tickMarkArray = d3.range(xAxisMin, xAxisMax, stepsBetweenTicks);
		    
				// Add the x-axis.
				svg.append("svg:g")
			        .attr("class", "x axis")
			        .attr("transform", "translate(0," + height + ")")
		            .call(d3.svg.axis()
		                .scale(xScale)
		                .tickSubdivide(3)
		                .tickSize(10, 5, 5)
		                .tickValues(tickMarkArray)
		                .tickFormat(function(d) {
		                	var noComma = d3.format("f");
		                	return noComma(d);
		                })
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

		        var defs = d3.select("svg").append("defs")

		        defs.append("marker")
		            .attr("id", "graph-dial-triangle-start")
		            .attr("viewBox", "0 0 10 10")
		            .attr("refX", 10)
		            .attr("refY", 5)
		            .attr("markerWidth", -6)
		            .attr("markerHeight", 6)
		            .attr("orient", "auto")
		          	.append("path")
		            .attr("d", "M 0 0 L 10 5 L 0 10 z");

		        defs.append("marker")
		            .attr("id", "graph-dial-triangle-end")
		            .attr("viewBox", "0 0 10 10")
		            .attr("refX", 10)
		            .attr("refY", 5)
		            .attr("markerWidth", 6)
		            .attr("markerHeight", 6)
		            .attr("orient", "auto")
		          	.append("path")
		            .attr("d", "M 0 0 L 10 5 L 0 10 z");

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
					   .attr("marker-end", "url(#graph-dial-triangle-end)")
					   .style("stroke-dasharray", (lineStyle));
				}

				_.each(scope.selectedRegions, function(element, index, list){
					drawGraphLine(element.data, colorMap[element.color], element.lineStyle,1);
				});

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

		                var formattedDate = convertXPosToFormattedDate(newX);

		                scope.$apply(function(){
		                	scope.dataSpec.month = formattedDate.month;
		                	scope.dataSpec.year = formattedDate.year;
		                });
		            })
		            .on("dragend", function(d,i) {
		              var rawDateNum = getDateAsDecimal();
		              var newX = xScale(rawDateNum);
		              var snapToPosDistance = newX - d3.event.x;
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
					drawMonthDial(getDateAsDecimal());

					$(".month-dial").on("mousedown", function(e){
						  var $popover = $('.month-dial-popover');
						  var relativeX = e.pageX - $(this).parent().parent().offset().left - margin.left;
						  var relativeY = e.pageY - $(this).parent().parent().offset().top - margin.top;
						  var popoverHeight = $popover.height();
						  var popoverWidth = $popover.width();
						  var center =  $('.main-unemp-graph').width()/2;
						  
						  $popover.css("left", relativeX - popoverWidth + 60).css("top", 20);
						  if (relativeX <= center) {
						    $popover.css("left", relativeX + margin.left).removeClass("left").addClass("right");                  
						  } else {
						    $popover.css("left", relativeX - $popover.width()+margin.left).removeClass("right").addClass("left");
						  }
						  if(scope.selectedRegions.length) scope.$apply(scope.showMonthDialPopover = true);
					})
					$("body").on('mouseup.hideMonthDialPopover', function () { 
						scope.$apply(scope.showMonthDialPopover = false) 
					});
		    }// end of redrawEntireGraph()
	         
	        scope.$watch("selectedRegions", function() {
	          redrawEntireGraph(2014, scope.highestVisibleRate);
	        });

	  	}// end link function
    }// end returned object
}]);