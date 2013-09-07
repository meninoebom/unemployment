var services = angular.module('unemployment.services', []);

services.factory('unemploymentDataService', function($http) {
	
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
		getDataFromDataset: function(dataset, d1, d2, months_before) {
			if (!dataset.hasOwnProperty('values')) {
				// hasn't finished loading data yet...
				return [];
			}
			if (months_before == undefined) months_before = 12;
			var range_start = this.calculateMonthsBetween(dataset.start_date, d1);
			var ixStart = Math.max(0, range_start - months_before);
			var ixEnd = Math.min(this.calculateMonthsBetween(dataset.start_date, d2), dataset.values.length);
			data = [];
			for (var i = ixStart; i<=ixEnd; i++) {
					data.push([i - range_start, dataset.values[i]]);
			}
			return data;
		},
		getData: function(d1, d2, months_before) {
			return this.getDataFromDataset(this.unemployment, d1, d2, months_before);
		},
		getLaborData: function(d1, d2, months_before) {
			return this.getDataFromDataset(this.labor_force, d1, d2, months_before);
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
		
});

