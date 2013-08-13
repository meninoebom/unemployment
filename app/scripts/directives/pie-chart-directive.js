'use strict';

angular.module('pie-chart-directive-module', []).directive('piechart', ['$window', '$timeout', function($window, $timeout) {
  
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