'use strict';

angular.module('directives.mapping', [])
.directive('jqmMap',['mapDataService',function(mapDataService){
		return {
			restrict: 'CA',
			link: function(scope, element, attrs, ngModel) {
				console.log('Linked');
				
				var jqmMap;
				var hasHasInitialLoad = false;
				
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
					console.log(scope.dataSpec.subRegionData);
					if (hasHasInitialLoad) {
						updateFeatureData();
					}
				});

				scope.$watch('dataSpec.county1+" "+dataSpec.county2', function() {
					console.log('county changed');
					if (!hasHasInitialLoad || !jqmMap.checkIfMapIsReady()) return;
					jqmMap.unhighlightFeatures();
					var stateId = mapDataService.stateAbbreviations[scope.dataSpec.regionName].toLowerCase();
					var cdata;
					if (scope.dataSpec.county1!='') {
						cdata = dataForCounty(scope.dataSpec.county1);
						jqmMap.highlightFeature('us_'+stateId+'_'+cdata.id);
					}
					if (scope.dataSpec.county2!='') {
						cdata = dataForCounty(scope.dataSpec.county2);
						jqmMap.highlightFeature('us_'+stateId+'_'+cdata.id);
					}
				});

				scope.$watch('dataSpec.regionName', function() {
					console.log('region changed');
					var regionName = scope.dataSpec.regionName;
					if (regionName=="United States") {
						if (jqmMap.getCurrentLevel()>0) {
							jqmMap.getBackToPreviousLevel();
						}
						updateFeatureData();
					} else {
						var region_id = 'us_'+mapDataService.stateAbbreviations[regionName].toLowerCase();
						jqmMap.loadChildTheme(region_id, 'jquerymaps/themes/state_'+region_id+'.xml');
					}
				});
				
				function dataForCounty(countyName) {
					for (var i=0; i<scope.dataSpec.subRegionData.length; i++) {
						if (scope.dataSpec.subRegionData[i].name==countyName) {
							return scope.dataSpec.subRegionData[i];
						}
					}
				};

				function dataForCountyById(countyId) {
					for (var i=0; i<scope.dataSpec.subRegionData.length; i++) {
						if (scope.dataSpec.subRegionData[i].id==countyId) {
							return scope.dataSpec.subRegionData[i];
						}
					}
				};

				function updateFeatureData() {
					console.log('update feature data for level '+jqmMap.getCurrentLevel());
					var regionName = (jqmMap.getCurrentLevel()==0 ? "United States" : scope.dataSpec.regionName);
					mapDataService.getRegionalDataForDate(regionName, 
						scope.dataSpec.year+'-'+scope.dataSpec.month,
						function (data) {
							console.log(data);
							var featureCats = [];
							var features = jqmMap.getFeatures();
							var catPfx = (data.region.name=="United States" ? 'state_' : 'county_'); 
							for (var i = 0; i<features.length; i++) {
								var feature = features[i];
								var localId;
								if (data.region.name=="United States") {
									localId = feature.id.split('_')[1].toUpperCase();
								} else {
									localId = feature.id.split('_')[2];
								}
								var subRData = _.findWhere(data.subRegions, {id: localId});
								if (subRData) {
									feature.popup = subRData.value+"%";
									var catN = Math.min(Math.floor(subRData.value/5.0)+1,5);
									featureCats.push({id: feature.id, newCategory: catPfx+catN});
								} else {
									feature.popup = 'Data unavailable ['+localId+']';
									featureCats.push({id: feature.id, newCategory: catPfx+'1'});
								}
							}
							jqmMap.changeFeatureCategoriesById(featureCats);
						});
				}
				
				var onJqmSystemEvent = function(obj) {
					console.log('General event'); 
					console.log(obj);
					if (obj.event=="allDataProcessed") {
						hasHasInitialLoad = true;
						/*
						var features = jqmMap.getFeatures();
						var featureCategories = [];
						for (var i = 0; i<features.length; i++) {
							var feature = features[i];
							feature.popup = 'Id is '+feature.id;
						}
						*/
						updateFeatureData();
					} else if (obj.event=="buttonClicked" && obj.button=="back" && obj.level==0) {
						console.log("went back");
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
					var dataId;
					if (scope.dataSpec.regionName=="United States") {
					} else {
						dataId = obj.id.split('_')[2];
						var countyData = dataForCountyById(dataId);
						if (scope.dataSpec.county1==countyData.name)  {
							scope.dataSpec.county1 = '';
						} else if (scope.dataSpec.county2==countyData.name)  {
							scope.dataSpec.county2 = '';
						} else if (scope.dataSpec.county1=='') {
							scope.dataSpec.county1 = countyData.name;
						} else {
							scope.dataSpec.county2 = countyData.name;
						}
						scope.$apply();
					}
				}
				window['countyClicked'] = onCountyClicked; // I HATE THIS!!!!! but that's how it must be done for now...

			}
			
		}
	}]);
