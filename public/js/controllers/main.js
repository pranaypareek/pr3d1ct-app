angular.module('pr3d1ctController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Predictors', function($scope, $http, Predictors) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Predictors.search()
			.success(function(data) {
        console.log('data=====================', data);
        $scope.places = data;
				$scope.loading = false;
			});
	}]);