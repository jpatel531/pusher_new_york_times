var app = angular.module('NewYorkTimes', []);

app.controller('AppCtrl', ['$scope', '$http', function($scope, $http){

	$http.get('/api/articles').success(function(data){
		$scope.articles = data
	});


}]);