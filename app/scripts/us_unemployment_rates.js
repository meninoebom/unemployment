/*

Usage:

dates are always in the format YYYY-MM.

date manipulations:
US_Unemployment_Data.months_between(d1,d2) : number of months between the two dates (i.e., d2 - d1, in months); negative if d2 is before d1
US_Unemployment_Data.date_with_offset(d, offset) : a formatted date (i.e. YYYY-MM) which is offset months after the date d

data tools, where you want the data to be an array of [x,y] arrays:

US_Unemployment_Data.data_for_range(d1, d2, months_before)
	each point p in the array has p[0] = months_between d and the date for this point, p[1] the rate for that month
US_Unemployment_Data.interpolate_series = function(series_points, x)
	given a series as above, interpolate for a given x (x=0 means the original start date)
	
and the same data tools, where you want the data to be an array of {x:date_offset, y:rate}:

US_Unemployment_Data.data_for_range_xy(d1, d2, months_before)
	each point p in the array has p.x = months_between d and the date for this point, p.y the rate for that month
US_Unemployment_Data.interpolate_series_xy = function(series_points, x)
	given a series as above, interpolate for a given x (x=0 means the original start date)
	
*/

US_Unemployment_Data = {'start_date': '1929-04-01',
 'values': [0.69, 1.65, 2.06, 0.79, 0.04, 0.91, 2.31, 1.89, 2.08, 		// 1929
		2.21, 3.12, 3.63, 3.6, 3.39, 3.77, 5.02, 6.64, 7.79, 9.01, 10.78, 11.89, 		// 1930
		11.18, 11.67, 11.78, 11.94, 12.3, 13.02, 13.84, 15.01, 15.83, 16.75, 17.95, 19.1, 		// 1931
		18.04, 18.66, 19.78, 21.03, 22.34, 23.72, 24.54, 25.02, 24.85, 24.82, 24.67, 25.2, 		// 1932
		23.72, 24.03, 25.36, 25.49, 25.59, 25.04, 23.84, 22.45, 21.48, 21.26, 21.29, 21.07, 		// 1933
		18.8, 17.9, 16.81, 16.64, 16.96, 17.69, 18.79, 20.27, 21.51, 21.54, 21.41, 20.44, 		// 1934
		17.88, 17.5, 17.54, 17.55, 17.77, 18.14, 17.72, 17.77, 18.41, 17.45, 16.8, 16.44, 		// 1935
		14.96, 15.1, 14.86, 15.57, 14.67, 14.85, 14.25, 13.46, 13.31, 13.81, 13.24, 12.78, 		// 1936
		12.11, 11.99, 11.73, 11.85, 11.23, 11.5, 10.97, 11.14, 11.63, 12.19, 13.7, 15.91, 		// 1937
		16.88, 17.88, 18.49, 18.96, 19.74, 20.0, 19.58, 19.18, 18.6, 18.22, 17.14, 16.36, 		// 1938
		17.61, 17.43, 17.19, 17.39, 16.9, 16.29, 16.18, 15.79, 15.22, 15.48, 15.49, 15.19, 		// 1939
		15.53, 15.28, 15.03, 15.82, 15.5, 13.38, 14.11, 14.94, 13.32, 14.76, 14.25, 13.41, 		// 1940
		12.13, 11.72, 11.86, 12.24, 10.91, 9.84, 9.2, 9.53, 9.0, 7.8, 7.37, 6.91, 		// 1941
		7.0, 6.71, 6.34, 5.75, 4.94, 4.57, 4.33, 3.74, 3.26, 3.23, 3.12, 2.88, 		// 1942
		2.4, 2.37, 2.02, 1.93, 1.82, 2.08, 2.16, 1.81, 1.71, 1.62, 1.4, 1.35, 		// 1943
		1.35, 1.18, 1.27, 1.22, 1.42, 1.44, 1.41, 1.2, 1.19, 0.91, 0.99, 1.0, 		// 1944
		1.05, 1.1, 1.07, 1.02, 1.05, 1.47, 1.54, 1.51, 3.4, 3.33, 3.53, 3.92, 		// 1945
		3.96, 3.96, 4.21, 3.9, 4.26, 4.02, 3.54, 3.73, 3.97, 4.0, 3.96, 4.16, 		// 1946
		4.2, 4.3, 4.0, 4.1, 3.3, 3.9, 4.0, 3.4, 3.1, 2.7, 2.7, 2.8, 		// 1947
		3.4, 3.8, 4.0, 3.9, 3.5, 3.6, 3.6, 3.9, 3.8, 3.7, 3.8, 4.0, 		// 1948
		4.3, 4.7, 5.0, 5.3, 6.1, 6.2, 6.7, 6.8, 6.6, 7.9, 6.4, 6.6, 		// 1949
		6.5, 6.4, 6.3, 5.8, 5.5, 5.4, 5.0, 4.5, 4.4, 4.2, 4.2, 4.3, 		// 1950
		3.7, 3.4, 3.4, 3.1, 3.0, 3.2, 3.1, 3.1, 3.3, 3.5, 3.5, 3.1, 		// 1951
		3.2, 3.1, 2.9, 2.9, 3.0, 3.0, 3.2, 3.4, 3.1, 3.0, 2.8, 2.7, 		// 1952
		2.9, 2.6, 2.6, 2.7, 2.5, 2.5, 2.6, 2.7, 2.9, 3.1, 3.5, 4.5, 		// 1953
		4.9, 5.2, 5.7, 5.9, 5.9, 5.6, 5.8, 6.0, 6.1, 5.7, 5.3, 5.0, 		// 1954
		4.9, 4.7, 4.6, 4.7, 4.3, 4.2, 4.0, 4.2, 4.1, 4.3, 4.2, 4.2, 		// 1955
		4.0, 3.9, 4.2, 4.0, 4.3, 4.3, 4.4, 4.1, 3.9, 3.9, 4.3, 4.2, 		// 1956
		4.2, 3.9, 3.7, 3.9, 4.1, 4.3, 4.2, 4.1, 4.4, 4.5, 5.1, 5.2, 		// 1957
		5.8, 6.4, 6.7, 7.4, 7.4, 7.3, 7.5, 7.4, 7.1, 6.7, 6.2, 6.2, 		// 1958
		6.0, 5.9, 5.6, 5.2, 5.1, 5.0, 5.1, 5.2, 5.5, 5.7, 5.8, 5.3, 		// 1959
		5.2, 4.8, 5.4, 5.2, 5.1, 5.4, 5.5, 5.6, 5.5, 6.1, 6.1, 6.6, 		// 1960
		6.6, 6.9, 6.9, 7.0, 7.1, 6.9, 7.0, 6.6, 6.7, 6.5, 6.1, 6.0, 		// 1961
		5.8, 5.5, 5.6, 5.6, 5.5, 5.5, 5.4, 5.7, 5.6, 5.4, 5.7, 5.5, 		// 1962
		5.7, 5.9, 5.7, 5.7, 5.9, 5.6, 5.6, 5.4, 5.5, 5.5, 5.7, 5.5, 		// 1963
		5.6, 5.4, 5.4, 5.3, 5.1, 5.2, 4.9, 5.0, 5.1, 5.1, 4.8, 5.0, 		// 1964
		4.9, 5.1, 4.7, 4.8, 4.6, 4.6, 4.4, 4.4, 4.3, 4.2, 4.1, 4.0, 		// 1965
		4.0, 3.8, 3.8, 3.8, 3.9, 3.8, 3.8, 3.8, 3.7, 3.7, 3.6, 3.8, 		// 1966
		3.9, 3.8, 3.8, 3.8, 3.8, 3.9, 3.8, 3.8, 3.8, 4.0, 3.9, 3.8, 		// 1967
		3.7, 3.8, 3.7, 3.5, 3.5, 3.7, 3.7, 3.5, 3.4, 3.4, 3.4, 3.4, 		// 1968
		3.4, 3.4, 3.4, 3.4, 3.4, 3.5, 3.5, 3.5, 3.7, 3.7, 3.5, 3.5, 		// 1969
		3.9, 4.2, 4.4, 4.6, 4.8, 4.9, 5.0, 5.1, 5.4, 5.5, 5.9, 6.1, 		// 1970
		5.9, 5.9, 6.0, 5.9, 5.9, 5.9, 6.0, 6.1, 6.0, 5.8, 6.0, 6.0, 		// 1971
		5.8, 5.7, 5.8, 5.7, 5.7, 5.7, 5.6, 5.6, 5.5, 5.6, 5.3, 5.2, 		// 1972
		4.9, 5.0, 4.9, 5.0, 4.9, 4.9, 4.8, 4.8, 4.8, 4.6, 4.8, 4.9, 		// 1973
		5.1, 5.2, 5.1, 5.1, 5.1, 5.4, 5.5, 5.5, 5.9, 6.0, 6.6, 7.2, 		// 1974
		8.1, 8.1, 8.6, 8.8, 9.0, 8.8, 8.6, 8.4, 8.4, 8.4, 8.3, 8.2, 		// 1975
		7.9, 7.7, 7.6, 7.7, 7.4, 7.6, 7.8, 7.8, 7.6, 7.7, 7.8, 7.8, 		// 1976
		7.5, 7.6, 7.4, 7.2, 7.0, 7.2, 6.9, 7.0, 6.8, 6.8, 6.8, 6.4, 		// 1977
		6.4, 6.3, 6.3, 6.1, 6.0, 5.9, 6.2, 5.9, 6.0, 5.8, 5.9, 6.0, 		// 1978
		5.9, 5.9, 5.8, 5.8, 5.6, 5.7, 5.7, 6.0, 5.9, 6.0, 5.9, 6.0, 		// 1979
		6.3, 6.3, 6.3, 6.9, 7.5, 7.6, 7.8, 7.7, 7.5, 7.5, 7.5, 7.2, 		// 1980
		7.5, 7.4, 7.4, 7.2, 7.5, 7.5, 7.2, 7.4, 7.6, 7.9, 8.3, 8.5, 		// 1981
		8.6, 8.9, 9.0, 9.3, 9.4, 9.6, 9.8, 9.8, 10.1, 10.4, 10.8, 10.8, 		// 1982
		10.4, 10.4, 10.3, 10.2, 10.1, 10.1, 9.4, 9.5, 9.2, 8.8, 8.5, 8.3, 		// 1983
		8.0, 7.8, 7.8, 7.7, 7.4, 7.2, 7.5, 7.5, 7.3, 7.4, 7.2, 7.3, 		// 1984
		7.3, 7.2, 7.2, 7.3, 7.2, 7.4, 7.4, 7.1, 7.1, 7.1, 7.0, 7.0, 		// 1985
		6.7, 7.2, 7.2, 7.1, 7.2, 7.2, 7.0, 6.9, 7.0, 7.0, 6.9, 6.6, 		// 1986
		6.6, 6.6, 6.6, 6.3, 6.3, 6.2, 6.1, 6.0, 5.9, 6.0, 5.8, 5.7, 		// 1987
		5.7, 5.7, 5.7, 5.4, 5.6, 5.4, 5.4, 5.6, 5.4, 5.4, 5.3, 5.3, 		// 1988
		5.4, 5.2, 5.0, 5.2, 5.2, 5.3, 5.2, 5.2, 5.3, 5.3, 5.4, 5.4, 		// 1989
		5.4, 5.3, 5.2, 5.4, 5.4, 5.2, 5.5, 5.7, 5.9, 5.9, 6.2, 6.3, 		// 1990
		6.4, 6.6, 6.8, 6.7, 6.9, 6.9, 6.8, 6.9, 6.9, 7.0, 7.0, 7.3, 		// 1991
		7.3, 7.4, 7.4, 7.4, 7.6, 7.8, 7.7, 7.6, 7.6, 7.3, 7.4, 7.4, 		// 1992
		7.3, 7.1, 7.0, 7.1, 7.1, 7.0, 6.9, 6.8, 6.7, 6.8, 6.6, 6.5, 		// 1993
		6.6, 6.6, 6.5, 6.4, 6.1, 6.1, 6.1, 6.0, 5.9, 5.8, 5.6, 5.5, 		// 1994
		5.6, 5.4, 5.4, 5.8, 5.6, 5.6, 5.7, 5.7, 5.6, 5.5, 5.6, 5.6, 		// 1995
		5.6, 5.5, 5.5, 5.6, 5.6, 5.3, 5.5, 5.1, 5.2, 5.2, 5.4, 5.4, 		// 1996
		5.3, 5.2, 5.2, 5.1, 4.9, 5.0, 4.9, 4.8, 4.9, 4.7, 4.6, 4.7, 		// 1997
		4.6, 4.6, 4.7, 4.3, 4.4, 4.5, 4.5, 4.5, 4.6, 4.5, 4.4, 4.4, 		// 1998
		4.3, 4.4, 4.2, 4.3, 4.2, 4.3, 4.3, 4.2, 4.2, 4.1, 4.1, 4.0, 		// 1999
		4.0, 4.1, 4.0, 3.8, 4.0, 4.0, 4.0, 4.1, 3.9, 3.9, 3.9, 3.9, 		// 2000
		4.2, 4.2, 4.3, 4.4, 4.3, 4.5, 4.6, 4.9, 5.0, 5.3, 5.5, 5.7, 		// 2001
		5.7, 5.7, 5.7, 5.9, 5.8, 5.8, 5.8, 5.7, 5.7, 5.7, 5.9, 6.0, 		// 2002
		5.8, 5.9, 5.9, 6.0, 6.1, 6.3, 6.2, 6.1, 6.1, 6.0, 5.8, 5.7, 		// 2003
		5.7, 5.6, 5.8, 5.6, 5.6, 5.6, 5.5, 5.4, 5.4, 5.5, 5.4, 5.4, 		// 2004
		5.3, 5.4, 5.2, 5.2, 5.1, 5.0, 5.0, 4.9, 5.0, 5.0, 5.0, 4.9, 		// 2005
		4.7, 4.8, 4.7, 4.7, 4.6, 4.6, 4.7, 4.7, 4.5, 4.4, 4.5, 4.4, 		// 2006
		4.6, 4.5, 4.4, 4.5, 4.4, 4.6, 4.7, 4.6, 4.7, 4.7, 4.7, 5.0, 		// 2007
		5.0, 4.9, 5.1, 5.0, 5.4, 5.6, 5.8, 6.1, 6.1, 6.5, 6.8, 7.3, 		// 2008
		7.8, 8.3, 8.7, 9.0, 9.4, 9.5, 9.5, 9.6, 9.8, 10.0, 9.9, 9.9, 		// 2009
		9.8, 9.8, 9.9, 9.9, 9.6, 9.4, 9.5, 9.5, 9.5, 9.5, 9.8, 9.3, 		// 2010
		9.1, 9.0, 8.9, 9.0, 9.0, 9.1, 9.0, 9.0, 9.0, 8.9, 8.6, 8.5, 		// 2011
		8.3, 8.3, 8.2, 8.1, 8.2, 8.2, 8.2, 8.1, 7.8, 7.9, 7.8, 7.8, 		// 2012
		7.9, 7.7, 7.6, 7.5, 7.6, 7.6, 7.4]};
						
US_Unemployment_Data.months_between = function(d1, d2) {
	var ym1 = d1.split('-');
	var ym2 = d2.split('-');
	return 12*(ym2[0]-ym1[0]) + (ym2[1]-ym1[1]);
};

US_Unemployment_Data.date_with_offset = function(d, offset) {
	var y = d.split('-')[0];
	var m = d.split('-')[1];
	
	var epoch = y*12 + (m-1);
	epoch += offset;
	
	var m1 = epoch % 12;
	var y1 = (epoch - m1)/12;
	m1+=1;
	m1 = (m1<10 ? '0'+m1 : m1);
	return y1+'-'+m1;
};

// given two dates in YYYY-MM format, and a number of months before d1 to start the range at, return an array of
// [x,y] array pairs, where x is the offset in months between d1 and y is the unemployment rate.
US_Unemployment_Data.data_for_range = function(d1, d2, months_before) {
	if (months_before==undefined) months_before=12;
	
	var range_start = US_Unemployment_Data.months_between(US_Unemployment_Data.start_date, d1);
	var ixStart = Math.max(0, range_start-months_before);
	var ixEnd = Math.min(US_Unemployment_Data.months_between(US_Unemployment_Data.start_date, d2), US_Unemployment_Data.values.length);
	
	data = [];
	for (var i = ixStart; i<=ixEnd; i++) {
			data.push([i-range_start, US_Unemployment_Data.values[i]]);
	}
	
	return data;
	
};

// given a sorted(!!!) array of [x,y] array pairs; return y for a given x with interpolation
US_Unemployment_Data.interpolate_series = function(series_points, x) {
	var ix = 0;
	while (ix<series_points.length && series_points[ix][0]<x) { ix++};
	if (ix>=series_points.length) return NaN;
	if (series_points[ix][0]==x) return series_points[ix][1];
	if (ix==0) return NaN;
	
	var v1 = series_points[ix-1][1];
	var v2 = series_points[ix][1];
	
	var k = (x - series_points[ix-1][0])*1.0/(series_points[ix][0] - series_points[ix-1][0]);

	return v1 + (v2-v1)*k;
};

// given two dates in YYYY-MM format, and a number of months before d1 to start the range at, return an array of
// {x:xvalue,y:yvalue} dict pairs, where x is the offset in months between d1 and y is the unemployment rate.
US_Unemployment_Data.data_for_range_xy = function(d1, d2, months_before) {
	if (months_before==undefined) months_before=12;
	
	var range_start = US_Unemployment_Data.months_between(US_Unemployment_Data.start_date, d1);
	var ixStart = Math.max(0, range_start-months_before);
	var ixEnd = Math.min(US_Unemployment_Data.months_between(US_Unemployment_Data.start_date, d2), US_Unemployment_Data.values.length);
	
	data = [];
	for (var i = ixStart; i<=ixEnd; i++) {
		if (i>=0) {
			data.push({x:i-range_start, y:US_Unemployment_Data.values[i]});
		}
	}
	
	return data;
	
};

// given a sorted(!!!) array of {x:xvalue,y:yvalue} dict pairs; return y for a given x with interpolation
US_Unemployment_Data.interpolate_series_xy = function(series_points, x) {
	var ix = 0;
	while (ix<series_points.length && series_points[ix].x<x) { ix++};
	if (ix>=series_points.length) return NaN;
	if (series_points[ix].x==x) return series_points[ix].y;
	if (ix==0) return NaN;
	
	var v1 = series_points[ix-1].y;
	var v2 = series_points[ix].y;
	
	var k = (x - series_points[ix-1].x)*1.0/(series_points[ix].x - series_points[ix-1].x);

	return v1 + (v2-v1)*k;
};