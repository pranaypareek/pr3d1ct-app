angular.module('pr3d1ctService', [])

// super simple service
// each function returns a promise object 
.factory('Predictors', ['$http', function($http) {
    return {
        search: function(types) {
        	console.log("hey", types);
        	for(var i=0; i<types.length; i++) {
        		if(!types[i]) types[i]='null';
        	}

            return $http.get('/search?location=koramangala&types='
            	+types[0]+'|'+types[1]+'|'+types[2]+'|'+types[3]+'|'+types[4]);
        },
        location: function() {
            return $http.get('/locations?location=koramangala');
        },
        listing: function() {
            return $http.get('/listings?location=koramangala');
        },
        predict: function (locations, type) {
        	return $http.get('/predict?locations='+locations+'&field='+type);
        },
    };
}]);
