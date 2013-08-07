'use strict';

var unemploymentApp = angular.module('unemploymentApp', ['ui','ui.state', 'level-1-directives', 'questionDirectives'])
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
      })
      .state('level-2-intro', {
      url: "/level/2/intro",
        templateUrl: "views/level-2-intro.html",
        baseClass: "intro"
      })
      .state('level-2', {
        url: "/level/2",
        templateUrl: "views/level-2.html",
        controller: 'Level2Ctrl',
        baseClass: "level-2"
      });
  }]).run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }).factory('responseHandler', function($rootScope){
    return {
      showHint: function() {
         $rootScope.$broadcast('showHint');
      }
    }
});


