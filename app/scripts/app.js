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
      {gender: "m", failedAttempts: 0, name: "John Doe", description: "Works as a freelancer from home", employmentCategoryId: 1, active: "true"},
      {gender: "f", failedAttempts: 0, name: "Rhonda Pulkowski", description: "Works as a freelancer from home", employmentCategoryId: 2, active: "true"},
      {gender: "m", failedAttempts: 0, name: "Bill Green", description: "Works as a freelancer from home", employmentCategoryId: 3, active: "true"},
      {gender: "f", failedAttempts: 0, name: "Mary Brown", description: "Works as a freelancer from home", employmentCategoryId: 4, active: "true"},
      {gender: "m", failedAttempts: 0, name: "Davinder Paramkha", description: "Works as a freelancer from home", employmentCategoryId: 5, active: "true"},
      {gender: "f", failedAttempts: 0, name: "Lucy Chang", description: "Works as a freelancer from home", employmentCategoryId: 1, active: "true"},
      {gender: "f", failedAttempts: 0, name: "Sue Smith", description: "Works as a freelancer from home", employmentCategoryId: 2, active: "true"},
      {gender: "m", failedAttempts: 0, name: "Mike Rogers", description: "Works as a freelancer from home", employmentCategoryId: 3, active: "true"}
    ];

$scope.employmentCategories = [
      { id: 1,
        name: 'employed',
        parent: 7,
        profiles: 0
      },
      { id: 2,
        name: 'frictionally unemployed',
        parent: 8,
        profiles: 0
      },
      { id: 3,
        name: 'structurally unemployed',
        parent: 8,
        profiles: 0
      },
      { id: 4,
        name: 'cyclically unemployed',
        parent: 8,
        profiles: 0
      },
      { id: 5,
        name: 'not in labor',
        parent: 6,
        profiles: 0
      },
      { id: 6,
        name: 'non institutional',
        parent: null,
        profiles: 0
      },
      { id: 7,
        name: 'labor force',
        parent: 6,
        profiles: 0
      },
      { id: 8,
        name: 'unemployed',
        parent: 7,
        profiles: 0
      }
    ];
    $scope.profileCountsMap = {
      employed: $scope.employmentCategories[0].profiles,
      unemployed: $scope.employmentCategories[7].profiles,
      laborForce: $scope.employmentCategories[6].profiles,
      notInLaborForce: $scope.employmentCategories[4].profiles,
      nonInstitutional: $scope.employmentCategories[5].profiles,
      frictional: $scope.employmentCategories[1].profiles,
      structural: $scope.employmentCategories[2].profiles,
      cyclical: $scope.employmentCategories[3].profiles,
    }

    $scope.getEmpCategoryObjById = function(id) {
        var obj = $scope.findObjById($scope.employmentCategories, id);
        return obj;
    }

    $scope.findObjById = function(array, id) {
      for(var i = 0, len = array.length; i < len; i++) {
        if(array[i].id == id) {
          return array[i];
        }
      }
    }

    $scope.addProfiles = function(id){
      var tree = $scope.employmentCategories;
      var node = $scope.findObjById(tree, id);
      $scope.updateTree(tree, node);
      console.log(tree);
    }

    $scope.updateTree = function updateTree(tree, node) {
      if(node.parent) {
        var parentNode = $scope.findObjById(tree, node.parent);
        updateTree(tree, parentNode)
      }
      node.profiles++;
    }

}]);


