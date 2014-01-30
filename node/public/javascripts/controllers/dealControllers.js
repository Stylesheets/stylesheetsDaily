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

	$http.get('/api/amazonProducts')
		.success(function(data) {
			$scope.amazonImageURLs = data;
			window.console.log('Within Angular Got deals from Amazon Product api');
		})
		.error(function(data) {
			window.console.log('Error: ' + data);
		});

	$http.get('/api/deals')
		.success(function(data) {
			$scope.deals = data;
			window.console.log('Within Angular Got deals from api');
		})
		.error(function(data) {
			window.console.log('Error: ' + data);
		});
}