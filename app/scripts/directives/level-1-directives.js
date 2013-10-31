'use strict';

angular.module('directives.ue.level-1', [])
.directive('showDetails', function(){
    return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
	       var name = scope.profile.name;
	       var description = scope.profile.description;
	       var employmentCategoryObj = scope.getEmpCategoryObjById(scope.profile.employmentCategoryId);
	       var empCategoryName = employmentCategoryObj.name;
	       scope.$watch(attrs.profile, function(profile) {       	
		       if(profile.active){        
		         var content = "<div class='detail-content'><h4>"+name+"</h4><p>"+description+"</p></div>";
		       } else {
		         var content = "<div class='detail-content'><h4>"+name+"</h4><p>"+description+"</p><span><strong>"+empCategoryName+"</strong></span></div>";
		       }
		       elem.bind('mouseenter', function(){
			       elem.popover({content: content, placement: 'right', html: true});
			       elem.popover('show'); 
		        }).bind('mouseleave', function(){
			        elem.popover('destroy');
		        });
	       }, true);
		}
	};
})
.directive('profileBg', function(){
    return {
		restrict: 'A',
		link: function(scope, elem, attrs, ctrl) {
			var theElem = elem;
		    var whichImg = Math.floor(Math.random()*3)+1;
	        scope.$watch(attrs.profile, function(profile) {
		        var gender = (profile.gender == 'm') ? 'male' : 'female';
				if(profile.active) {
			    	elem.css("background-image", "url('img/profiles/"+gender+"/"+whichImg+"_active.png')");
	        		elem.bind('mouseenter.bg', function(){
			            elem.css("background-image", "url('img/profiles/"+gender+"/"+whichImg+"_roll.png')");
			        }).bind('mouseleave.bg', function(){
				        elem.css("background-image", "url('img/profiles/"+gender+"/"+whichImg+"_active.png')");
			        })
	        	} else {
			        elem.unbind('mouseenter.bg');
			        elem.unbind('mouseleave.bg');
			        elem.css("background-image", "url('img/profiles/"+gender+"/"+whichImg+"_inactive.png')");
	        	}	        
	        }, true);
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
			var category = scope.getEmpCategoryObjById(attrs.employmentCategoryId);
			var count = 0;
			elem.bind('dragover', function(e) {
				e.preventDefault();
			}).bind('drop', function(e) {
				e.preventDefault();
				var currentProfileIndex = e.originalEvent.dataTransfer.getData('text/plain');
				var currentProfile = scope.profiles[currentProfileIndex];
				scope.currentProfile.name = currentProfile.name;
				if(currentProfile.employmentCategoryId == attrs.employmentCategoryId) {
					count++;
					ngModel.$setViewValue(count);
					scope.$apply(function(){
						currentProfile.active = false;
						scope.addProfiles(attrs.employmentCategoryId);
					});
					scope.showCorrectFeedback();
					ngModel.$render();
				} else	{
					scope.$apply(function(){
						currentProfile.failedAttempts++;
					});
					scope.showIncorrectFeedback();
				}
			});
			ngModel.$render = function() {
				elem.find('.total').html(ngModel.$viewValue || 0);
			}
		}
	};
});