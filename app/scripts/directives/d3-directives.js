'use strict';

angular.module('d3Directives', []).directive('piechart', ['$window', '$timeout', function($window, $timeout) {
  
  var link  = function(scope, element, attrs, ctrl) {

    var data = scope.data;
  
    var size = scope.options.size,
        width = Math.min(element[0].parentElement.offsetWidth, size),
        height = Math.min(element[0].parentElement.offsetHeight, size),
        radius = Math.min(width, height) / 2,
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
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.category); })
        .style("stroke", "white")
        .style("stroke-width", "4");

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.category; });
  };//end of link function

  return {
    replace: true,
    restrict: 'E',
    scope: {data: '=', options: '='},
    template: '<div></div>',
    link: link
  };

}]);