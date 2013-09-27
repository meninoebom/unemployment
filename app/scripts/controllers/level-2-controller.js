'use strict';

unemploymentApp.controller('Level2Ctrl', ['$scope', '$state',  function($scope, $state ) {

$scope.currentQuestion = {num: 1};//which question will display first
$scope.acceptingResponses = true;
$scope.fillInTheBlankResponse = {value: 0};
$scope.fillInTheBlankAnswers = [64, 92, 8, 8];
$scope.numAttempts = 0;

$scope.eqTool = {
  employed: "",
  unemployed: "",
  nonInstitutional: ""
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
    colors: ["#006639", "#8dc758"]
  };

  $scope.laborForceChartOptions = {
    diameter: 192,
    rotation: 330,
    colors: ["#0d5b92", "#70caf2"]
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
    },
    { text: "a group of baby boomers reitre from heir full time jobs",
      moveFromCategoryId: 1,
      moveToCategoryId: 5,
      answers: {
        laborForceParticipation: 'decrease',
        employment: 'decrease',
        unemployment: 'increase'
      }
    },
    { text: "a group of people who are employed full time at a factory lose their jobs due to the plant moving outside the country",
      moveFromCategoryId: 8,
      moveToCategoryId: 1,
      answers: {
        laborForceParticipation: 'same',
        employment: 'decrease',
        unemployment: 'increase'
      }
    },
    { text: "a group of people who quit their previous jobs found better full time jobs",
      moveFromCategoryId: 2,
      moveToCategoryId: 1,
      answers: {
        laborForceParticipation: 'stay',
        employment: 'increase',
        unemployment: 'decrease'
      }
    },
    { text: "a group of full time sutdents graduate and get full time jobs",
      moveFromCategoryId: 5,
      moveToCategoryId: 1,
      answers: {
        laborForceParticipation: 'increase',
        employment: 'increase',
        unemployment: 'decrease'
      }
    },
    { text: "a group of people who were employed full time decide to stay at home with their kids",
      moveFromCategoryId: 1,
      moveToCategoryId: 5,
      answers: {
        laborForceParticipation: 'decrease',
        employment: 'decrease',
        unemployment: 'increase'
      }
    }
  ];

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

  $scope.submitFillInTheBlankResponse = function(questionNum) {
    if (!$scope.acceptingResponses) return;
    var answer = $scope.fillInTheBlankAnswers[questionNum-1];
    if($scope.fillInTheBlankResponse.value == answer) {
      $scope.$broadcast('showCorrectPopover', undefined, $scope.loadNextFillInTheBlankQuestion);
      $scope.displayPieChartPercentage(questionNum);
    } else {
      $scope.numAttempts += 1;
      var eventName = "showQuestion"+questionNum+"IncorrectPopover";
      $scope.$broadcast(eventName, $scope.lockPopoverStage, $scope.unlockPopoverStage);
    }  
  }

  $scope.loadNextFillInTheBlankQuestion = function() {
    $scope.$apply(function() {
      $scope.currentQuestion.num = $scope.currentQuestion.num + 1;
      console.log($scope.currentQuestion.num);
      $scope.fillInTheBlankResponse.value = 0;
      $scope.numAttempts = 0;
    })
  }
 
  $scope.lockPopoverStage = function() {
    $scope.acceptingResponses = false;
  }
  $scope.unlockPopoverStage = function() {
    $scope.acceptingResponses = true;
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

  $scope.submitScenarioResponses = function() {
    if (!$scope.acceptingResponses) return;
    if (!$("input[name=labor-force]:checked").val() 
      || !$("input[name=employment]:checked").val() 
      || !$("input[name=unemployment]:checked").val()) { 
      $scope.$broadcast('chooseAnswersPopover', undefined, undefined, "Choose one answer for each category, then click 'Next'");     
    } else {
      //tally the score here
      $scope.showScenarioFeedback($scope.currentScenario);
    }
  }

  $scope.showScenarioFeedback = function(currentScenario) {
     $scope.acceptingResponses = false;

     $('body').bind('click.lock keyup.lock', function(e) {
        e.preventDefault();
     });

    var answerStatus = [];

    var lfpScenarioFeedback = $scope.createScenarioFeedbackForRate($("input[name=labor-force]:checked").val(), currentScenario.answers.laborForceParticipation, 'Labor Force Participation');
    $scope.lfpScenarioFeedback = lfpScenarioFeedback.content;
    answerStatus.push(lfpScenarioFeedback.status);

    var empScenarioFeedback = $scope.createScenarioFeedbackForRate($("input[name=employment]:checked").val(), currentScenario.answers.employment, 'Employment');
    $scope.empScenarioFeedback = empScenarioFeedback.content;
    answerStatus.push(empScenarioFeedback.status);
    
    var unempScenarioFeedback = $scope.createScenarioFeedbackForRate($("input[name=unemployment]:checked").val(), currentScenario.answers.unemployment, 'Unemployment');
    $scope.unempScenarioFeedback = unempScenarioFeedback.content;
    answerStatus.push(unempScenarioFeedback.status);

    var allAnswersCorrect = true;
    for(var i = 0; i < answerStatus.length; i++) {
      if (answerStatus[i] != 'correct') allAnswersCorrect = false;
    }

    if (allAnswersCorrect) {
      $scope.$broadcast('showCorrectPopover');
    } else {
      $scope.$broadcast('showScenarioFeedbackPopover');
    }

    function closePopover() {
      $scope.$broadcast('closeAllPopovers');
      $scope.doAnimation(currentScenario);
      $scope.acceptingResponses = true;
      $('body').unbind('click.lock keyup.lock');
    }
    setTimeout(closePopover, 5000);
  }

  $scope.createScenarioFeedbackForRate = function(studentResponse, correctAnswer, rateName) {
    var feedback = {};
    if (studentResponse === correctAnswer) {
      feedback.status = 'correct';
      feedback.content = "";
    } else {
      feedback.status = 'incorrect';
      feedback.content = "The " + rateName + " Rate ";
      switch(correctAnswer) {
        case "increase":
          feedback.content += "increased.";
          break;     
        case "decrease":
          feedback.content += "decreased.";
          break;     
        case "same":
          feedback.content += "stayed the same.";
          break;
      }
    }
    return feedback;
  };

  $scope.doAnimation = function(scenario) {
    if(scenario.moveToCategoryId) {
      var num = _.random(5,10);
      var from = _.findWhere($scope.employmentCategories, {id: scenario.moveFromCategoryId});
      var to = _.findWhere($scope.employmentCategories, {id: scenario.moveToCategoryId});
      console.log('moving from ' + from.name + ' to ' + to.name);
    }
    $scope.$apply(function () {
      $scope.getNextScenario();
    });
  }

  $scope.getNextScenario = function() {
    if ($scope.scenarios.length > 1) {
      var currentScenarioIndex = _.random($scope.scenarios.length - 1);
      $scope.currentScenario = $scope.scenarios[currentScenarioIndex];
      $scope.scenarios.splice(currentScenarioIndex, 1);
    } else if ($scope.scenarios.length == 1) {
      $scope.currentScenario = $scope.scenarios[0];
      $scope.scenarios = [];
    } else {
      $state.transitionTo('level-3-intro');
      return;
    }
    $("input").prop('checked', false); 
  }
  $scope.getNextScenario();
}]);
