'use strict';

var unemploymentApp = angular.module('unemploymentApp', ['ui','ui.state', 'dragdrop'])
  .config(['$stateProvider','$routeProvider', function ($stateProvider, $routeProvider) {
    $stateProvider
      .state('intro', {
        url: "",
        templateUrl: "views/intro.html",
        baseClass: "intro"
      })
      .state('overview', {
        url: "/overview",
        templateUrl: "views/overview.html",
        baseClass: "intro"
      })
      .state('level-1-intro', {
      url: "/level/1/intro",
        templateUrl: "views/level-1-intro.html",
        baseClass: "intro"
      })
      .state('level-1', {
        url: "/level/1",
        templateUrl: "views/level-1.html",
        controller: 'Level1Ctrl',
        baseClass: "level-1"
      });
  }]).run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }).controller('Level1Ctrl', ['$scope', function($scope) {
    $scope.incorrectModal = angular.element('#incorrect-modal');
    $scope.incorrectModal.modal({
      show: false
    });  
    $scope.incorrect = function() {
      $scope.incorrectModal.modal('show');
    }
}]);;


