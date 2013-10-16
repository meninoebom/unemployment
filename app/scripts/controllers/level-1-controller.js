'use strict';

unemploymentApp.controller('Level1Ctrl', ['$scope', function($scope) {
    $scope.locked = false;
    $scope.employedCount = 0;
    $scope.frictionalCount = 0;
    $scope.structuralCount = 0;
    $scope.cyclicalCount = 0;
    $scope.notInLaborForceCount = 0;
    $scope.currentProfile = {};
    $scope.profiles = [
      {gender: "f", failedAttempts: 0, name: "Sarah", description: "works 40 hours a week at the local retail shoe store", employmentCategoryId: 1, active: "true"},
      {gender: "m", failedAttempts: 0, name: "Jim", description: "has recently accepted a new job, but he does not begin this job until 30 days from now", employmentCategoryId: 2, active: "true"},
      {gender: "f", failedAttempts: 0, name: "Jiayi", description: "stays home cooking, cleaning and taking care of her home and her family", employmentCategoryId: 5, active: "true"},
      {gender: "f", failedAttempts: 0, name: "Lauren", description: "volunteers 30 hours a week in a local soup kitchen", employmentCategoryId: 5, active: "true"},
      {gender: "m", failedAttempts: 0, name: "Morgan", description: "works 20 hours each week at an on campus bookstore", employmentCategoryId: 1, active: "true"},
      {gender: "f", failedAttempts: 0, name: "Amanda", description: "used to work at a travel agency that has closed recently due to lack of business caused by online travel websites", employmentCategoryId: 3, active: "true"},
      {gender: "m", failedAttempts: 0, name: "Eric", description: "needed a break from his job search and has not looked for a job in two weeks", employmentCategoryId: 2, active: "true"},
      {gender: "f", failedAttempts: 0, name: "LaShanna", description: "used to work at a real estate office, which recently laid off some of its workers, including LaShanna, due to the recession", employmentCategoryId: 4, active: "true"}
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

    $scope.showCorrectFeedback = function() {
        $scope.$broadcast('showCorrectResponsePopover', 
          function() { $scope.locked = true; },
          function() { $scope.locked = false; },
          2000
        );
    }

    $scope.showIncorrectFeedback = function() {
      $scope.$broadcast("showIncorrectResponsePopover", 
        function () { $scope.locked = true; },
        function() { $scope.locked = false; },
        3000
      );    
    }

    $scope.getIncorrectFeedbackPopoverContent = function() {
      return "You placed "+$scope.currentProfile.name+" in the wrong category.";
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
    }

    $scope.updateTree = function updateTree(tree, node) {
      if(node.parent) {
        var parentNode = $scope.findObjById(tree, node.parent);
        updateTree(tree, parentNode)
      }
      node.count++;
    }

}]);