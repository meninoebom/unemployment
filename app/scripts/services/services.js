var services = angular.module('unemployment.services', []);

services.factory('unemploymentDataService', function() {
	var data = {
		"Great Depression: August 1929 - March 1933" : [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 9, 9, 9],
		"May 1937 - June 1938" : [5, 2, 4, 9, 3, 2, 8, 3, 8, 9, 2, 9, 3],
		"February 1945 - October 1945" : [4, 8, 3, 5, 6, 8, 4, 3, 5, 6, 7, 3, 1]
	}
	return {
	    getData : function(id) {
	      return data[id];
	    }
	}
});



