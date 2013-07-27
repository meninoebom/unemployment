'use strict';

angular.module('unemploymentApp', ['ui','ui.state'])
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
        baseClass: "level-1"
      })  ;


    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl'
    //   })
    //   .otherwise({
    //     redirectTo: '/'
    //   });
  }]).run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }).directive('draggable', function(){
    return {
      restrict: 'A', //attribute only
      link: function(scope, elem, attr, ctrl) {
        elem.bind('dragstart', function(e) {
          //do something here.
            this.style.opacity = '0.4';  // this / e.target is the source node.
            console.log("dragging");
        }); 
        elem.bind('drop', function(e) {
          //do something here.
            console.log("dropped");
        });
      }
    };
  });
