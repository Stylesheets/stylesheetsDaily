'use strict';

/* Controllers */

function dealController($scope, $http) {
	/*
	$scope.deals = [{
		name: "Kirk",
		description: "Some Desc"
	}, {
		name: "Ryan",
		description: "Some other Desc"
	}];
	*/

	$http.get('/api/deals')
		.success(function(data) {
			$scope.deals = data;
			console.log('Within Angular Got deals from api');
		})
		.error(function(data) {
			console.log('Error: ' + data)
		});
}