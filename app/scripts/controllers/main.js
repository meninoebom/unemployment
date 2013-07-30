'use strict';

angular.module('unemploymentApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
  	$scope.incorrectModal = angular.element('incorrect-modal');
  }]);
