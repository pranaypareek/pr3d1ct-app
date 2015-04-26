angular.module('pr3d1ctService', [])

// super simple service
// each function returns a promise object 
.factory('Predictors', ['$http', function($http) {
    return {
        search: function() {
            return $http.get('/search?location=koramangala');
        },
        location: function() {
            return $http.get('/locations?location=koramangala');
        },
        listing: function() {
            return $http.get('/listings?location=koramangala');
        },
    }
}]);
