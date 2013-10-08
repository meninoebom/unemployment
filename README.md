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

h3. Feedback Popovers
Feedback popoevers occur on all 4 levels of the app. The work  like this

The mark up is placed in a file called ..views/level-x/level-x-popovers.html
and included in the level's main view like this: 
	<div ng-include src="'views/level-x/level-x-popovers.html'"></div>

The popover directive is located in scripts/directives/popover-directives, the module name is directives.ue.popovers and is included in app.js

To trigger a popover broadcast the event name registered as an attribute of the element that is made into a popover directive
For example, the following is a popover in level 3: 

	 <ue-popover class="instruction-popover" show-event="showInstructionPopover">
		<img src="img/popover-alert-icon.png" class="alert-icon" width="44" height="45" />
		<div class="popover-content">
			<p>{{instruction}}</p>
		</div>
	</ue-popover>

the "show-event" attribute value, in this case, "showIntructionPopover",  registers the event name that will cause this popover to show for 2000 milliseconds or until the user clis on the screen which ever comes first. 

In the Controller:
Continuing with our example, to display this intruction popover in level 3 the controller broadasts the "show-event":
	$scope.$broadcast("showInstructionPopover", $scope.lock, $scope.unlock);

The event handler in the popover directive accepts to extra parameters... 
a fadeIn callback: triggered of course once the popover has faded 
a fadeOut callback: triggered when the popover is fully faded out
a timer: the amount of milliseconds until the popover should fade out

The incorrectFeedback Popovers get thier content by way of an angular expression that calls a scope function called "getIncorrectResponseFeedback"


The Feedback Popovers


h3. Graphing Detail Popovers
This popover appears when the user mouses over a line on the line graphs on level 3 or 4

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