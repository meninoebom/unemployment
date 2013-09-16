'use strict';

/* Filters */

angular.module('unemploymentApp.filters', ['unemploymentApp.services']).
  filter('pointFormat', [function() {
    return function(val) {
			if (val!=undefined) {
				var d = Date.dateFromFloat(val[0]);
				return [d.getFullYear()+'-'+d.getShortMonthName(), val[1]];
			}
    }
  }])
  .filter('percentageFilter', [function() {
    return function (input) {
    	if(input === undefined || input === 'undefined' || input === 'null' || input === null || input <= 0 || isNaN(input) || input === false || input === '') return 'NA';
      console.log(input);
      return input + '%';
    };
  }]);