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
		link: function(scope, elem, attrs, ctrl) {
			var correctAnswer = attrs.employmentStatus;
			elem.bind('dragover', function(e) {
				e.preventDefault();
			}).bind('drop', function(e) {
				e.preventDefault();
				var profileStatus = e.originalEvent.dataTransfer.getData('text/plain');
				console.log(profileStatus);
				if(profileStatus == correctAnswer) {
					console.log('correctAnswer');
				} else	{
					scope.incorrect();
				}
			});
		}
	};
});