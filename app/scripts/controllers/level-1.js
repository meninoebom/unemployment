// 'use strict';

// angular.module('unemploymentApp')
//   .controller('Level-1Controller', ['$scope', function ($scope) {
//   	$scope.incorrectModal = angular.element('incorrect-modal');
//   	$scope.incorrect = function() {
// 	  	$scope.incorrectModal.modal();
//   	}
//   }]);
//
'use strict';


angular.module('unemploymentApp')
  .controller('Level1Ctrl', function ($scope) {
	console.log($scope);
  	$scope.incorrectModal = angular.element('incorrect-modal');
  	$scope.incorrect = function() {
	  	$scope.incorrectModal.modal();
  	}
});