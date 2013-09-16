'use strict';

/* Filters */

angular.module('unemploymentApp.filters', ['unemploymentApp.services']).
  filter('pointFormat', [function() {
    return function(val) {
			if (val!=undefined) {
				var y = Math.floor(val[0]);
				var m = Math.floor(val[0]*12)%12;
				var d = new Date(y,m,1); // Date.dateFromFloat(val[0]);
				return [d.getFullYear()+'-'+d.getShortMonthName(), val[1]];
			}
    }
  }]);
