angular.module('pr3d1ctController', [])

// inject the Todo service factory into our controller
.controller('mainController', ['$scope', '$http', 'Predictors', function($scope, $http, Predictors) {
    $scope.formData = {};
    $scope.loading = true;
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    $scope.searchMap = function() {
      Predictors.search()
        .success(function(data) {

            $scope.placesGeometryList = [];


            data.results.forEach(function(obj) {
                $scope.placesGeometryList.push(obj.geometry.location);
            });

            console.log('placesGeometryList: ', $scope.placesGeometryList);

            var lat = $scope.placesGeometryList[0].lat;
            var lng = $scope.placesGeometryList[0].lng;

            $scope.map = { center: { latitude: lat, longitude: lng }, zoom: 15 };
            $scope.loading = false;
        });
      }
}]);
