'use strict';

unemploymentApp.controller('Level2Ctrl', ['$scope', function($scope) {
    $scope.incorrectModal = angular.element('#incorrect-modal');
    $scope.incorrectModal.modal({
      show: false
    });  
    $scope.incorrect = function() {
      $scope.incorrectModal.modal('show');
    }

$scope.employmentCategories = [
      { id: 1,
        name: 'employed',
        parent: 7,
        count: 2941
      },
      { id: 2,
        name: 'frictionally unemployed',
        parent: 8,
        count: 109
      },
      { id: 3,
        name: 'structurally unemployed',
        parent: 8,
        count: 55
      },
      { id: 4,
        name: 'cyclically unemployed',
        parent: 8,
        count: 3
      },
      { id: 5,
        name: 'not in labor',
        parent: 6,
        count: 1827
      },
      { id: 6,
        name: 'non institutional',
        parent: null,
        count: 5020
      },
      { id: 7,
        name: 'labor force',
        parent: 6,
        count: 3193
      },
      { id: 8,
        name: 'unemployed',
        parent: 7,
        count: 252
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

}]);