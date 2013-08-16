'use strict';

var unemploymentApp = angular.module('unemploymentApp', ['ui','ui.state', 'angular-underscore', 'ui.bootstrap', 'level-1-directives-module', 'level-2-directives-module', 'pie-chart-directive-module'])
  .config(['$stateProvider','$routeProvider', function ($stateProvider, $routeProvider) {
    $stateProvider
      .state('intro', {
        url: "",
        templateUrl: "views/main-intro.html",
        baseClass: "intro"
      })
      .state('overview', {
        url: "/overview",
        templateUrl: "views/main-overview.html",
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
        controller: "Level1Ctrl",
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
        controller: "Level2Ctrl",
        baseClass: "level-2"
      })
      .state('level-3-intro', {
        url: "/level/3/intro",
        templateUrl: "views/level-3-intro.html",
        baseClass: "intro"
      })
      .state('level-3', {
        url: "/level/3",
        templateUrl: "views/level-3.html",
        controller: "Level3Ctrl",
        baseClass: "level-3"
      })
      .state('test', {
        url: "/test",
        templateUrl: "views/test.html",
        controller: "testCtrl",
        baseClass: ""
      });
  }]).run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });


