angular.module('pr3d1ctController', [])

// inject the Todo service factory into our controller
.controller('mainController', ['$scope', '$http', 'Predictors', function($scope, $http, Predictors) {
    $scope.formData = {};
    $scope.loading = true;
    $scope.checkBoxModel = [];
    $scope.types = [];
    Predictors.location()
        .success(function (location) {
          $scope.map = { 
            center: 
              { 
                latitude: location.latitude,
                longitude: location.longitude 
              }, 
              zoom: 15 
          };

          Predictors.listing()
            .success(function (listings) {
              $scope.listings = listings;
            });
        });
    $scope.predict = function(types) {
      var count = 0;
      var bestChoice = [];
      types.forEach(function (type) {
        Predictors.predict($scope.listings, type) 
        .success(function (nearestObjectForEachLocationByType){
          bestChoice.push(nearestObjectForEachLocationByType);
          count ++;
          if(count === types.length) {
            var i = 0;
            var j = 0;
            var sum = 0;
            var sumArray = [];
            for (j=0; j < $scope.listings.length; j++){
              for (i=0; i < bestChoice.length; i++) {
                sum = sum + bestChoice[i][j].shortestDistance;
              }
              sumArray.push(sum);
            }
            var least = sumArray[0];
            var leastIndex = 0;
            for (i=1; i < sumArray.length; i++) {
              if (sumArray[i] < least) {
                least = sumArray[i];
                leastIndex = i;
              }   
            }
            $scope.bestChoice = $scope.listings[leastIndex];
          }
        });
      });
    };
    $scope.searchMap = function() {
      Predictors.search($scope.types)
        .success(function (data) {
            $scope.placesGeometryList = [];
            data.results.forEach(function(obj) {
                if(obj.icon === 'http://maps.gstatic.com/mapfiles/place_api/icons/fitness-71.png') {
                  obj.icon = 'https://raw.githubusercontent.com/pranaypareek/pr3d1ct-app/master/public/static/images/Dumbbell-26.png';
                }

                if (obj.icon === 'http://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png') {
                  obj.icon = 'https://raw.githubusercontent.com/pranaypareek/pr3d1ct-app/master/public/static/images/buddhism.png';
                }

                if (obj.icon === 'http://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png') {
                  obj.icon = 'https://raw.githubusercontent.com/pranaypareek/pr3d1ct-app/master/public/static/images/Red-Cross.png';
                }

                if (obj.icon === 'http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png') {
                  obj.icon = 'https://cdn4.iconfinder.com/data/icons/Pretty_office_icon_part_2/24/Briefcase.png';
                }

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
