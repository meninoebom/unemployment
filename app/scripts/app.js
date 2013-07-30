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

    $scope.employedCount = 0;
    $scope.frictionalCount = 0;
    $scope.structuralCount = 0;
    $scope.cyclicalCount = 0;
    $scope.notInLaborForceCount = 0;


    $scope.incorrectModal = angular.element('#incorrect-modal');
    $scope.incorrectModal.modal({
      show: false
    });  
    $scope.incorrect = function() {
      $scope.incorrectModal.modal('show');
    }
    $scope.profiles = [
      {incorrectAttempts: 0, name: "John Doe", description: "Works as a freelancer from home", employmentStatus: "employed", active: "true"},
      {incorrectAttempts: 0, name: "Rhonda Pulkowski", description: "Works as a freelancer from home", employmentStatus: "employed", active: "true"},
      {incorrectAttempts: 0, name: "Bill Green", description: "Works as a freelancer from home", employmentStatus: "employed", active: "true"},
      {incorrectAttempts: 0, name: "Mary Brown", description: "Works as a freelancer from home", employmentStatus: "employed", active: "true"},
      {incorrectAttempts: 0, name: "Davinder Paramkha", description: "Works as a freelancer from home", employmentStatus: "employed", active: "true"},
      {incorrectAttempts: 0, name: "Lucy Chang", description: "Works as a freelancer from home", employmentStatus: "employed", active: "false"},
      {incorrectAttempts: 0, name: "Sue Smith", description: "Works as a freelancer from home", employmentStatus: "employed", active: "true"}
    ];

}]);;


