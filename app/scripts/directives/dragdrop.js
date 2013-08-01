'use strict';

angular.module('dragdrop', [])
.directive('profileBg', function(){
    return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
		    attrs.$observe('gender', function(value) {
		        var gender = (value == 'm') ? 'male' : 'female';
			    var rand = Math.floor(Math.random()*3)+1;
		        elem.bind('mouseenter', function(){
		            elem.css("background-image", "url('img/profiles/"+gender+"/"+rand+"_roll.png')");
		        }).bind('mouseleave', function(){
		        	setDefaultBgImage(elem);
		        })
		        var setDefaultBgImage = function(elem) {
		        	if(elem.hasClass('active')) {
		        		elem.css("background-image", "url('img/profiles/"+gender+"/"+rand+"_active.png')");
		        	} else {
				        elem.css("background-image", "url('img/profiles/"+gender+"/"+rand+"_inactive.png')");
		        	}
		        }
		        setDefaultBgImage(elem);		        
		    });
		}
	};
})
.directive('draggable', function(){
	return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {

			elem.bind('dragstart', function(e) {
				e.originalEvent.dataTransfer.setData('text/plain', attrs.index);
			});
		}
	};
})
.directive('target', function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attrs, ngModel) {
			var correctAnswer = scope.empStatusMap[attrs.employmentStatus];
			var count = 0;

			elem.bind('dragover', function(e) {
				e.preventDefault();
			}).bind('drop', function(e) {
				e.preventDefault();
				var currentProfileIndex = e.originalEvent.dataTransfer.getData('text/plain');
				var currentProfile = scope.profiles[currentProfileIndex];
				var profileStatus = scope.empStatusMap[currentProfile.employmentStatus];
				if(profileStatus == correctAnswer) {
					count++;
					ngModel.$setViewValue(count);
					scope.$apply(function(){
						currentProfile.active = false;
					});
					ngModel.$render();
				} else	{
					scope.$apply(function(){
						currentProfile.failedAttempts++;
					});
					scope.incorrect();
				}
			});

			ngModel.$render = function() {
				elem.find('.total').html(ngModel.$viewValue || 0);
			}

		}
	};
});