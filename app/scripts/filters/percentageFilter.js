'use strict';

angular.module('unemploymentApp')
  .filter('percentageFilter', function () {
    return function (input) {
    	if(input === undefined || input === 'undefined' || input === null || input <= 0) return 'NA';
      return input + '%';
    };
  });
