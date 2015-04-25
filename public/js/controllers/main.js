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
                var temp = {
                  geometryList: {
                    idKey: obj.id,
                    icon: obj.icon,
                    latitude: obj.geometry.location.lat,
                    longitude: obj.geometry.location.lng
                  },
                  place_id: obj.place_id
                };
                $scope.placesGeometryList.push(temp.geometryList);
            });

            console.log('placesGeometryList: ', $scope.placesGeometryList);

            var lat = $scope.placesGeometryList[0].latitude;
            var lng = $scope.placesGeometryList[0].longitude;

            $scope.coords = {
              latitude: lat,
              longitude: lng
            };

            $scope.map = { center: { latitude: lat, longitude: lng }, zoom: 15 };
            $scope.loading = false;
        });
      };
}]);
