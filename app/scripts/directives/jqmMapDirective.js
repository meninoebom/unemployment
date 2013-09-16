'use strict';

angular.module('directives.mapping', [])
.directive('jqmMap',['mapDataService',function(mapDataService){
		return {
			restrict: 'CA',
			link: function(scope, element, attrs, ngModel) {
				console.log('Linked');
				
				var jqmMap;
				
        var params = {
            // The DIV that will contain the map
            mapDivId: "mapDiv",
            // The general configuration XML file
            configUrl: "jquerymaps/jqm_config_test.xml", //_basic.xml",
            // The initial theme (children themes may be loaded later on)
            initialThemeUrl: "jquerymaps/themes/us.xml"
        };
        // Create the map by instancing the Map class
        jqmMap = new JQueryMaps.Map(params);
				// for debugging...
				window['jqmMap'] = jqmMap;
				
				scope.$watch('dataSpec.year+" "+dataSpec.month', function() {
					console.log('date changed');
					console.log(scope.subRegionData);
				});

				scope.$watch('dataSpec.regionName', function() {
					console.log('region changed');
					var regionName = scope.dataSpec.regionName;
					if (regionName=="United States") {
						if (jqmMap.getCurrentLevel()>0) {
							jqmMap.getBackToPreviousLevel();
						}
					} else {
						var region_id = 'us_'+mapDataService.stateAbbreviations[regionName].toLowerCase();
						jqmMap.loadChildTheme(region_id, 'jquerymaps/themes/state_'+region_id+'.xml');
					}
				});

				var onJqmSystemEvent = function(obj) {
					console.log('General event');
					console.log(obj);
					if (obj.event=="allDataLoaded") {
						var features = jqmMap.getFeatures();
						var featureCategories = [];
						for (var i = 0; i<features.length; i++) {
							var feature = features[i];
							feature.popup = 'Id is '+feature.id;
						}
					} else if (obj.event=="buttonClicked" && obj.button=="back" && obj.level==0) {
						scope.dataSpec.regionName = "United States";
						scope.$apply();
					}
					console.log('Map is ready? '+jqmMap.checkIfMapIsReady());
				}
				window['jqmJsMap'] = onJqmSystemEvent; // I HATE THIS!!!!! but that's how it must be done for now...				
				
				var onStateClicked = function(obj) {
					console.log('State Clicked');
					console.log(obj);
					scope.dataSpec.regionName = obj.label;
					scope.$apply();
					console.log(scope.dataSpec);
					// jqmMap.loadChildTheme(obj.id, 'jquerymaps/themes/state_'+obj.id+'.xml');
				}
				window['stateClicked'] = onStateClicked; // I HATE THIS!!!!! but that's how it must be done for now...
				
				var onCountyClicked = function(obj) {
				}
				window['countyClicked'] = onCountyClicked; // I HATE THIS!!!!! but that's how it must be done for now...

			}
			
		}
	}]);
