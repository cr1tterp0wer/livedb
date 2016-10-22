var dbApp = angular.module('dbApp',['ngRoute','ngSanitize']);


dbApp.config(function($routeProvider, $locationProvider ){

	$locationProvider.hashPrefix();

	$routeProvider
	.when('/',{
  		templateUrl: 'views/home.html',
  		controller:  'homeController'
  	});
	$routeProvider
	.when('/load',{redirectTo:'/'});

	$locationProvider.html5Mode(true);

});