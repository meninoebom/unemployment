var services;

try {
	services = angular.module('unemploymentApp.services');
} catch (e) {
	services = angular.module('unemploymentApp.services', []);
}

services.factory('unemploymentDataService', ['$http', function($http) {
	
	// to handle some date formatting issues...
	Date.prototype.monthNames = [
	    "January", "February", "March",
	    "April", "May", "June",
	    "July", "August", "September",
	    "October", "November", "December"
	];

	Date.prototype.getMonthName = function() {
	    return this.monthNames[this.getMonth()];
	};
	Date.prototype.getShortMonthName = function () {
	    return this.getMonthName().substr(0, 3);
	};

	var dataservice = {
		// given two dates in YYYY-MM format, and a number of months before d1 to start the range at, return an array of
		// [x,y] array pairs, where x is the offset in months between d1 and y is the unemployment(or labor force) rate.
		
		unemployment: {},
		labor_force: {},
		
		calculateDateWithOffset: function(d, offset) {
			var y = d.split('-')[0];
			var m = d.split('-')[1];
			console.log(m);
			var epoch = y*12 + (m-1);
			epoch += offset;
			
			var m1 = epoch % 12;
			var y1 = (epoch - m1)/12;
			m1+=1;
			m1 = (m1<10 ? '0'+m1 : m1);
			return y1+'-'+m1;
		},
		calculateMonthsBetween: function(d1, d2) {
			var ym1 = d1.split('-');
			var ym2 = d2.split('-');
			return 12*(ym2[0]-ym1[0]) + (ym2[1]-ym1[1]);
		},	
		_getDataFromDatasetForDate: function(dataset, d1) {
			if (!dataset.hasOwnProperty('values')) {
				// hasn't finished loading data yet...
				return [];
			}
			var ixStart = this.calculateMonthsBetween(dataset.start_date, d1);
			var data = [];
			return dataset.values[ixStart];
		},
		_getDataFromDataset: function(dataset, d1, d2, months_before) {
			if (!dataset.hasOwnProperty('values')) {
				// hasn't finished loading data yet...
				return [];
			}
			if (months_before == undefined) months_before = 12;
			var range_start = this.calculateMonthsBetween(dataset.start_date, d1);
			var ixStart = Math.max(0, range_start - months_before);
			var ixEnd = Math.min(this.calculateMonthsBetween(dataset.start_date, d2), dataset.values.length);
			var data = [];
			for (var i = ixStart; i<=ixEnd; i++) {
					data.push([i - range_start, dataset.values[i]]);
			}
			return data;
		},
		getUnemploymentData: function(d1, d2, months_before) {
			return this._getDataFromDataset(this.unemployment, d1, d2, months_before);
		},
		getLaborForceData: function(d1, d2, months_before) {
			return this._getDataFromDataset(this.labor_force, d1, d2, months_before);
		},
		getUnemploymentDataForDate: function(date) {
			return this._getDataFromDatasetForDate(this.unemployment, date);
		},
		getLaborForceDataForForDate: function(date) {
			return this._getDataFromDatasetForDate(this.labor_force, date);
		},
		// deprecated because bad naming in light of labor force data; should be removed
		getData: function(d1, d2, months_before) {
			return this.getUnemploymentData(d1, d2, months_before);
		},
		interpolateDataSeries: function(series_points, x) {
			var ix = 0;
			while (ix<series_points.length && series_points[ix][0]<x) { ix++};
			if (ix>=series_points.length) return NaN;
			if (series_points[ix][0]==x) return series_points[ix][1];
			if (ix==0) return NaN;
			
			var v1 = series_points[ix-1][1];
			var v2 = series_points[ix][1];
			
			var k = (x - series_points[ix-1][0])*1.0/(series_points[ix][0] - series_points[ix-1][0]);
		
			return v1 + (v2-v1)*k;
		},
	  getCurrentMonthYearFormatted: function(startDate, offset) {
	    var currentDateFormatted = {};
	    var currentDate = this.calculateDateWithOffset(startDate, offset);
	    var y = currentDate.split('-')[0];
			var m = currentDate.split('-')[1];
			var currentDateObj = new Date(y, m-1, 01);
			currentDateFormatted.monthName = currentDateObj.getMonthName();
			currentDateFormatted.fullYear = currentDateObj.getFullYear();
			return currentDateFormatted;
	  }
	};
		
	$http.get('data/us_unemployment.json')
		.then(function(response) {
				dataservice.unemployment.start_date = response.data.start_date;
				dataservice.unemployment.values = response.data.values;
		});
	$http.get('data/us_labor_force.json')
		.then(function(response) {
				dataservice.labor_force.start_date = response.data.start_date;
				dataservice.labor_force.values = response.data.values;
		});
	
	return dataservice;
		
}]);

services.factory('mapDataService',['$http', function($http) {
	/*
	
	use getRegionalDataForDate to get data on some date for a region(US or a state) and its subregions (either states or counties).
	use getChartableData to get data suitable for charting for the US, a state, and two counties.
	
	Since the data may or may not be handy already, these functions take a callback which will be invoked when 
	the data has been prepared (possibly immediately if the data has already been fetched previously).
	
	N.B.: Each region's data is a json encoded object with the following structure:
	{
		start_date: start date for all values, in YYY-MM-DD format (NOTE, Jan = 01 !!!),

		region: {
			name: Full name of region
			id: abbreviation for region
			values: array of unemployment values
		},
		
		sub_regions: [ // array of elements of the form...
										{name: subregion name,
										 id: subregion abbreviation,
										 values: array of unemployment values, starting at the region start_date
										},
										...
								]
	}
	
	*/
	
	var dataservice = {
		
		stateAbbreviations: {"United States": "US", "Mississippi": "MS", "Oklahoma": "OK", "Delaware": "DE", "Minnesota": "MN", "Illinois": "IL", 
			"Arkansas": "AR", "New Mexico": "NM", "Indiana": "IN", "Maryland": "MD", "Louisiana": "LA", "Idaho": "ID", "Wyoming": "WY", "Tennessee": "TN",
			"Arizona": "AZ", "Iowa": "IA", "Michigan": "MI", "Kansas": "KS", "Utah": "UT", "Virginia": "VA", "Oregon": "OR", "Connecticut": "CT", 
			"Montana": "MT", "California": "CA", "Massachusetts": "MA", "West Virginia": "WV", "South Carolina": "SC", "New Hampshire": "NH", 
			"Wisconsin": "WI", "Vermont": "VT", "Georgia": "GA", "North Dakota": "ND", "Pennsylvania": "PA", "Florida": "FL", "Alaska": "AK", 
			"Kentucky": "KY", "Hawaii": "HI", "Nebraska": "NE", "Missouri": "MO", "Ohio": "OH", "Alabama": "AL", "New York": "NY", 
			"South Dakota": "SD", "Colorado": "CO", "New Jersey": "NJ", "Washington": "WA", "North Carolina": "NC", "District of Columbia": "DC", 
			"Texas": "TX", "Nevada": "NV", "Maine": "ME", "Rhode Island": "RI"},
		
		allRegionData: {}, // collection of previously loaded json files, indexed by region name
		
		calculateMonthsBetween: function(d1, d2) {
			var ym1 = d1.split('-');
			var ym2 = d2.split('-');
			return 12*(ym2[0]-ym1[0]) + (ym2[1]-ym1[1]);
		},
		
		_prefetchRegion: function(region_name, callback) {
			if (this.allRegionData.hasOwnProperty(region_name)) {
				callback();
			} else {
				var that = this;
				var region_id = this.stateAbbreviations[region_name];
				console.log('fetching data for region "'+region_name+'"...');
				$http.get('data/state_map_json/'+region_id+'_urn.json').success(function(result){
					that.allRegionData[result.region.name] = result;
					callback();
				});
			}
		},
		getRegionalDataForDate: function(region_name, d, callback) {
			// console.log('getting '+region_name+' data for date '+d);
			var that = this;
			that._prefetchRegion('United States', function() {
				that._prefetchRegion(region_name, function() {

					var dataSource = that.allRegionData[region_name];
					var dateIndex = that.calculateMonthsBetween(dataSource.start_date, d);

					var result = {region: {name: dataSource.region.name, id:dataSource.region.id}};
					
					result.us = {name: 'United States', id:'US'};
					if (dateIndex<0 || dateIndex>=that.allRegionData['United States'].region.values.length) {
						result.us.value = NaN;
					} else {
						result.us.value = that.allRegionData['United States'].region.values[dateIndex];
					};
					
					if (dateIndex<0 || dateIndex>=dataSource.region.values.length) {
						result.region.value = NaN;
					} else {
						result.region.value = dataSource.region.values[dateIndex];
					};
					
					var sub_region_data = [];
					var sub_region_names = [];
					for (var i=0; i<dataSource.sub_regions.length; i++) {
						var subRegion = dataSource.sub_regions[i];
						var data = {name:subRegion.name, id:subRegion.id};
						if (dateIndex<0 || dateIndex>=subRegion.values.length) {
							data.value = NaN;
						} else {
							data.value = subRegion.values[dateIndex];
						};
						sub_region_data.push(data);	
						sub_region_names.push(subRegion.name);
					}
					result.subRegions = sub_region_data;
					result.subRegionNames = sub_region_names;
					callback(result);

				});
			});
			
		},

		getStateUnempDataForDate: function(region_name, d) {
			// console.log('getting '+region_name+' data for date '+d);
			var that = this;
			var data;
			that._prefetchRegion('United States', function() {
				that._prefetchRegion(region_name, function() {
					var dataSource = that.allRegionData[region_name];
					var dateIndex = that.calculateMonthsBetween(dataSource.start_date, d);
					var result = {region: {name: dataSource.region.name, id:dataSource.region.id}};
					if (dateIndex<0 || dateIndex>=dataSource.region.values.length) {
						data =  NaN;
					} else {
						data = dataSource.region.values[dateIndex];
					};
				});
			});
			return data;
		},
		
		_getChartableDataset: function(dataValues, start_date) {
			// x values are set as numeric years, with each month a fraction (1/12) of the year; so 1980-01 is 1980.0,
			// 1980-02 -> 1980.083333..., etc. Use Date.dateFromFloat(xval) to get a proper js Date as needed for displaying.
			var points = [];
			var y = start_date.split('-')[0]*1;
			var m = start_date.split('-')[1]*1 - 1;
			for (var i = 0; i<dataValues.length; i++) {
				var xval = y + m/12.0;
				points.push([xval, dataValues[i]]);
				m = (m+1) % 12;
				if (m==0) y++;
			}
			return points;
		},
		_getSubregionValues: function(regionName, subregionName) {
			var subregionList = this.allRegionData[regionName].sub_regions;
			for (var i = 0; i<subregionList.length; i++) {
				if (subregionList[i].name==subregionName) {
					return subregionList[i].values;
				}
			}
			return [];
		},
		getChartableData: function(stateName, county1, county2, callback) {
			var that = this;
			var result = {};
			that._prefetchRegion('United States', function() {
				
				that._prefetchRegion(stateName, function() {
					
					result['us'] = that._getChartableDataset(that.allRegionData['United States'].region.values, that.allRegionData['United States'].start_date);
					var start_date = that.allRegionData[stateName].start_date;
					result['state'] = that._getChartableDataset(that.allRegionData[stateName].region.values, start_date);
					result['county1'] = that._getChartableDataset(that._getSubregionValues(stateName, county1), start_date);
					result['county2'] = that._getChartableDataset(that._getSubregionValues(stateName, county2), start_date);
					callback(result);
					
				});
				
			});
			
		}
	
	};
	
	return dataservice;
	
}]);


