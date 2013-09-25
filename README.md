h1. << Pearson Unemployment >>

<< Project description >>

h2. Tool Set

Yeoman/Bower/Grunt
Angular.js
jQuery
SASS-Twitter-Bootstrap (https://github.com/jlong/sass-twitter-bootstrap) 
Angular-Bootstrap (http://angular-ui.github.io/bootstrap/) For the Level 2 info popovers
Angular-Underscore (https://github.com/floydsoft/angular-underscore) requires Angular and Underscore
Angular-UI-Router (https://github.com/angular-ui/ui-router)
D3.js

h3. Running
bc. npm install
bc. bower install

h3. Building
bc. Grunt Build


h3. Drag and Drop

h3. Level 2 Popovers and Modals

"showFormula" directive
-this directive creates a popover when you hover over links such as "labor force partricipation rate"
-triggers popover method on when "hover" is fired for the link

"incorrect-answer-popover"
- these are the red popovers that show when the user clicks "Next" on question 1 - 3 but has not answered question correctly. The popover shows different hints depending on how many times the user has clicked "Next for that question"
-shows when "showHint" event is fired

"info-button"
-uses the "infoButton" directive which creates a tooltip when the button is clicked that contains a calculator for solving equations

h3. D3 Popover Pattern

In the view
	<div class="popover detail-popover" ng-show="showDetailPopover" ><div class="arrow"></div>
			<div class="popover-content">
				{{period.name}}
				Month {{currentMonth}} <span class="month">{{period.currentMonthName}}</span> <span class="year">{{period.currentYear}}</span>

				<span class="unemp-rate">{{period.currentUnempRate}}</span> Unemployment Rate

				</div>
			</div>
		</div>
	</div>
In the controller
	$scope.showDetailPopover = false;
	$scope.toggleShowDetailPopover = function(state) {
        $scope.showDetailPopover = state;
    };
In the directive
	$(".graph-line").on("mouseover", function(){ 
	  scope.$apply( scope.showDetailPopover = true ); 
	}).on('mouseout', function () { 
	  scope.$apply( scope.showDetailPopover = false ); 
	});