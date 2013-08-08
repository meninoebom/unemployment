'use strict';

unemploymentApp.controller('Level2Ctrl', ['$scope',  function($scope ) {
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

  $scope.questions = [
    {answer: 100, url: 'views/level-2/questions/question-1.html'},
    {answer: 100, url: 'views/level-2/questions/question-2.html'},
    {answer: 100, url: 'views/level-2/questions/question-3.html'}
  ];

  $scope.numAttempts = 0;

  $scope.response = {value: 0};

  $scope.currentQuestion = {num: 1}
  
  $scope.submitResponse = function(num) {
    var answer = $scope.questions[num-1].answer;
    if($scope.response.value == answer) {
      $scope.currentQuestion.num = num + 1;
    } else {
      $scope.numAttempts++;
      $scope.$broadcast('showHint');
    }  
  }

  $scope.getCurrentQuestionUrl = function() {
    return $scope.questions[$scope.currentQuestion.num - 1].url;
    console.log($scope.questions[$scope.currentQuestion.num - 1].url);
  }

  $scope.populationChartData =   [
    {"category": "Not in Labor Force", "population": "2704659", "className": "not-labor-force-slice"},
    {"category": "Labor Force", "population": "4499890", "className": "labor-force-slice"}
  ]
  $scope.laborForceChartData =   [
    {"category": "Unemployed", "population": "2704659", "className": "unemployed-slice"},
    {"category": "employed", "population": "4499890", "className": "employed-slice"}
  ]

  $scope.populationChartOptions = {
    size: 200,
    colors: ["#006639", "#8dc758"],
  };

  $scope.laborForceChartOptions = {
    size: 200,
    colors: ["#70caf2", "#0d5b92"],
  };


}]);
