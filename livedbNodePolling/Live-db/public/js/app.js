var dbApp = angular.module('dbApp',['ngRoute','ngSanitize']);


dbApp.config(function($routeProvider, $locationProvider ){

	$locationProvider.hashPrefix();

	$routeProvider
	.when('/',{
  		templateUrl: 'views/home.html',
  		controller:  'homeController'
  	});


	$locationProvider.html5Mode(true);

});



// dbApp.config(function($stateProvider, $urlRouterProvider){
//     //$locationProvider.hashPrefix();

//     $urlRouterProvider.otherwise("home");
// 	$stateProvider
//   		.state("home",
//   		{
//     		url:'/',
//     		templateUrl: 'views/home.html',
//     		//template: "'<h3>Foo</h3>'",
//     		controller:'homeController'
//   		});
// 		$locationProvider.html5Mode(true);

// 	});