var app = angular.module('NewYorkTimes', ['pusher-angular']);

app.controller('AppCtrl', ['$scope', '$http', '$pusher', function($scope, $http, $pusher){

	$http.get('/api/articles').success(function(data){
		$scope.articles = data
	});

	$scope.articles = []

	var client = new Pusher('31649baed3ee58dc9afd');
	var pusher = $pusher(client);

	var newsChannel = pusher.subscribe('news-channel');

	newsChannel.bind('new-story', function(data){
		console.log("Receiving event...")
		console.log(data)
		$scope.articles.unshift(data);
	});


}]);