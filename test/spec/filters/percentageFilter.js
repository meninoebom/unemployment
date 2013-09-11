'use strict';

describe('Filter: percentageFilter', function () {

  // load the filter's module
  beforeEach(module('unemploymentApp'));

  // initialize a new instance of the filter before each test
  var percentageFilter;
  beforeEach(inject(function ($filter) {
    percentageFilter = $filter('percentageFilter');
  }));

  it('should return the input prefixed with "percentageFilter filter:"', function () {
    var text = 'angularjs';
    expect(percentageFilter(text)).toBe('percentageFilter filter: ' + text);
  });

});
