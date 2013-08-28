'use strict';

var unemploymentApp = angular.module('unemploymentApp', ['ui','ui.state', 'angular-underscore', 'ui.bootstrap', 'directives.ue.level-1', 'directives.ue.level-2', 'directives.ue.level-3', 'directives.ue.level-4', 'directives.ue.collapse','unemployment.services'])
  .config(['$stateProvider','$routeProvider', function ($stateProvider, $routeProvider) {
    $stateProvider
      .state('intro', {
        //url: "",
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
        templateUrl: "views/level-1/intro.html",
        baseClass: "intro"
      })
      .state('level-1', {
        url: "/level/1",
        templateUrl: "views/level-1/main.html",
        controller: "Level1Ctrl",
        baseClass: "level-1"
      })
      .state('level-2-intro', {
      url: "/level/2/intro",
        templateUrl: "views/level-2/intro.html",
        baseClass: "intro"
      })
      .state('level-2', {
        url: "/level/2",
        templateUrl: "views/level-2/main.html",
        controller: "Level2Ctrl",
        baseClass: "level-2"
      })
      .state('level-3-intro', {
        url: "/level/3/intro",
        templateUrl: "views/level-3/intro.html",
        baseClass: "intro"
      })
      .state('level-3', {
        url: "/level/3",
        templateUrl: "views/level-3/main.html",
        controller: "Level3Ctrl",
        baseClass: "level-3"
      })
      .state('level-4-intro', {
        url: "/level/4/intro",
        templateUrl: "views/level-4/intro.html",
        baseClass: "intro"
      })
      .state('level-4', {
        url: "",
        //url: "/level/4",
        templateUrl: "views/level-4/main.html",
        controller: "Level4Ctrl",
        baseClass: "level-4"
      });
  }]).run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  });


