/* Copyright (CC) Christopher Stenqvist, capodacac@gmail.com - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * without the express permission of Christopher Stenqvist
 *
 * This file is part of livedb, https://github.com/cr1tterp0wer/livedb.git
 *
 *
 ******************************************
 * Name:app.js - Angularjs module file -
 * ****************************************
 * Creates main angular app instance 
 * 
 * 
 *
 *
 *
 *
 *
 * *Proprietary and confidential
 * Written by Christopher Stenqvist, October 2016
 */

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