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
  }]);
