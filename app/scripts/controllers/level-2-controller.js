'use strict';

unemploymentApp.controller('Level2Ctrl', ['$scope', '$state',  function($scope, $state ) {

$scope.currentQuestion = {num: 1};//start at question

$scope.eqTool = {
  employed: "",
  unemployed: "",
  nonInstitutional: ""
}
$scope.laborParticipationRate = function() {
    return $scope.laborForce() / $scope.eqTool.nonInstitutional;
}
$scope.employmentRate = function() {
    return parseInt($scope.eqTool.employed)  / $scope.laborForce();
}
$scope.unemploymentRate = function() {
    return parseInt($scope.eqTool.unemployed)  / $scope.laborForce();
}
$scope.laborForce = function() {
  return parseInt($scope.eqTool.employed) + parseInt($scope.eqTool.unemployed);
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

  $scope.fillInTheBlankAnswers = [100, 100, 100, 100];

  $scope.numAttempts = 0;

  $scope.whichAttempt = function(num) {
    console.log("$scope.numAttempts = "+$scope.numAttempts);
    if($scope.numAttempts == num) {
      return true;
    } else {
      return false;
    }
  }

  $scope.response = {value: 0};

  $scope.showHint = false;
  
  $scope.submitResponse = function(questionNum) {
    var answer = $scope.fillInTheBlankAnswers[questionNum-1];
    if($scope.response.value == answer) {
      $scope.currentQuestion.num = questionNum + 1;
      $scope.response.value = 0;
      $scope.displayPieChartPercentage(questionNum);
      $scope.numAttempts = 0;
    } else {
      //$scope.numAttempts++;
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

  $scope.scenarios = [
    { text: "a group of people who are employed full time lose thier jobs and find part time employment",
      moveFromCategoryId: null,
      moveToCategoryId: null,
      answers: {
        laborForceParticipation: 'same',
        employment: 'same',
        unemployment: 'same'
      }
    },
    { text: "a group of autoworkers who were recently replaced by high tech robots decide to stop looking for work",
      moveFromCategoryId: 3,
      moveToCategoryId: 5,
      answers: {
        laborForceParticipation: 'decrease',
        employment: 'increase',
        unemployment: 'decrease'
      }
    },
    { text: "a group of people who had given up on finding work due to the recession start looking for work again",
      moveFromCategoryId: 5,
      moveToCategoryId: 4,
      answers: {
        laborForceParticipation: 'increase',
        employment: 'decrease',
        unemployment: 'increase'
      }
    }
  ];
  $scope.submitScenarioResponses = function() {
    if (!$("input[name=labor-force]:checked").val() 
      || !$("input[name=employment]:checked").val() 
      || !$("input[name=unemployment]:checked").val()) {      
      angular.element('#choose-answers-modal').modal('show');
    } else {
      //tally the score here
      $scope.doAnimation($scope.currentScenario);
      $scope.getNewRandomScenario();
      $scope.clearResponses(); 
    }
  }
  $scope.clearResponses = function() {
    $("input").prop('checked', false); 
  }
  $scope.doAnimation = function(scenario) {
    if(scenario.moveToCategoryId) {
      var num = _.random(5,10);
      var from = _.findWhere($scope.employmentCategories, {id: scenario.moveFromCategoryId});
      var to = _.findWhere($scope.employmentCategories, {id: scenario.moveToCategoryId});
      console.log('moving from ' + from.name + ' to ' + to.name);
    } else {
      return;
    }
  }
  $scope.getNewRandomScenario = function() {
    if ($scope.scenarios.length > 1) {
      var currentScenarioIndex = _.random($scope.scenarios.length - 1);
      $scope.currentScenario = $scope.scenarios[currentScenarioIndex];
      $scope.scenarios.splice(currentScenarioIndex, 1);
    } else if ($scope.scenarios.length == 1) {
      $scope.currentScenario = $scope.scenarios[0];
      $scope.scenarios = [];
    } else {
      $state.transitionTo('level-3-intro');
    }
  }
  $scope.getNewRandomScenario();
}]);