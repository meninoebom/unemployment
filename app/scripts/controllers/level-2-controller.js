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
  
  $scope.submitResponse = function(questionNum) {
    var answer = $scope.questions[questionNum-1].answer;
    if($scope.response.value == answer) {
      $scope.currentQuestion.num = questionNum + 1;
      $scope.displayPieChartPercentage(questionNum);
    } else {
      $scope.numAttempts++;
      $scope.$broadcast('showHint');
    }  
  }

  $scope.displayPieChartPercentage = function(questionNum) {
    switch(questionNum){
      case 1:
        angular.element('.labor-force-percentage-label').fadeIn("slow");
        angular.element('.not-labor-force-percentage-label').fadeIn("slow");
        break;
      case 2:
        angular.element('.employed-percentage-label').fadeIn("slow");
        break;     
      case 3:
        angular.element('.unemployed-percentage-label').fadeIn("slow");
        break;
        default:
        break;
    }
  }

  $scope.getCurrentQuestionUrl = function() {
    return $scope.questions[$scope.currentQuestion.num - 1].url;
    console.log($scope.questions[$scope.currentQuestion.num - 1].url);
  }

  $scope.notLaborCount = String($scope.employmentCategories[4].count);
  $scope.laborCount = String($scope.employmentCategories[6].count);
  $scope.unemployedCount = String($scope.employmentCategories[7].count);
  $scope.employedCount = String($scope.employmentCategories[0].count);

  $scope.populationChartData =   [
    {"category": "Labor Force", "population": $scope.laborCount, "className": "labor-force"},
    {"category": "Not in Labor Force", "population": $scope.notLaborCount, "className": "not-labor-force"}
  ]
  $scope.laborForceChartData =   [
    {"category": "Employed", "population": $scope.employedCount, "className": "employed"},
    {"category": "Unemployed", "population": $scope.unemployedCount, "className": "unemployed"}
  ]

  $scope.populationChartOptions = {
    diameter: 192,
    rotation: 12,
    colors: ["#006639", "#8dc758"],
  };

  $scope.laborForceChartOptions = {
    diameter: 192,
    rotation: 330,
    colors: ["#0d5b92", "#70caf2"],
  };


}]);
