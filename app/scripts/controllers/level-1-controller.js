'use strict';

unemploymentApp.controller('Level1Ctrl', ['$scope', function($scope) {
    $scope.employedCount = 0;
    $scope.frictionalCount = 0;
    $scope.structuralCount = 0;
    $scope.cyclicalCount = 0;
    $scope.notInLaborForceCount = 0;
    $scope.showIncorrectModal = function() {
      angular.element('#incorrect-modal').modal('show');
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
        count: 0
      },
      { id: 2,
        name: 'frictionally unemployed',
        parent: 8,
        count: 0
      },
      { id: 3,
        name: 'structurally unemployed',
        parent: 8,
        count: 0
      },
      { id: 4,
        name: 'cyclically unemployed',
        parent: 8,
        count: 0
      },
      { id: 5,
        name: 'not in labor',
        parent: 6,
        count: 0
      },
      { id: 6,
        name: 'non institutional',
        parent: null,
        count: 0
      },
      { id: 7,
        name: 'labor force',
        parent: 6,
        count: 0
      },
      { id: 8,
        name: 'unemployed',
        parent: 7,
        count: 0
      }
    ];

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
    }

    $scope.updateTree = function updateTree(tree, node) {
      if(node.parent) {
        var parentNode = $scope.findObjById(tree, node.parent);
        updateTree(tree, parentNode)
      }
      node.count++;
    }

}]);