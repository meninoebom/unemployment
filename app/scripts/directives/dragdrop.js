'use strict';

angular.module('dragdrop', [])
.directive('draggable', function(){
	return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
			elem.bind('dragstart', function(e) {
				//scope.currentProfileEmploymentStatus =  attrs.employmentStatus;
				e.originalEvent.dataTransfer.setData('text/plain', attrs.employmentStatus);
				console.log(attrs.employmentStatus);
			});
		}
	};
})
.directive('target', function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attrs, ngModel) {
			var correctAnswer = attrs.employmentStatus;
			scope.count = 0;

			elem.bind('dragover', function(e) {
				e.preventDefault();
			}).bind('drop', function(e) {
				e.preventDefault();
				var profileStatus = e.originalEvent.dataTransfer.getData('text/plain');

				if(profileStatus == correctAnswer) {
					scope.count = scope.count + 1;
					ngModel.$setViewValue(scope.count);
					ngModel.$render();
				} else	{
					scope.incorrect();
				}
			});


			ngModel.$render = function() {
				elem.find('.total').html(ngModel.$viewValue || 0);
			}

		}
	};
});