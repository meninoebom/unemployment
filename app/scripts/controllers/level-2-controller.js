'use strict';

unemploymentApp.controller('Level2Ctrl', ['$scope', 'responseHandler', function($scope, responseHandler) {

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
  $scope.questionData = {
    question1: {
      answer: 100,
      response: ""
    },
    question2: {
      answer: 100,
      response: ""
    },
    question3: {
      answer: 100,
      response: ""
    }
  };
  $scope.numAttempts = 0;
  $scope.submitResponse = function(question) {
    var answer = parseInt(question.answer);
    var response = parseInt(question.response);
    if(response === answer) {
      console.log('right');
    } else {
      $scope.numAttempts++;
      $scope.$broadcast('showHint');
    }
  }
}]);