/* Copyright (CC) Christopher Stenqvist, capodacac@gmail.com - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * without the express permission of Christopher Stenqvist
 *
 * This file is part of livedb, https://github.com/cr1tterp0wer/livedb.git
 *
 *
 ******************************************
 * Name:homeController.js - Angular Home Controller -
 * ****************************************
 * MVC for HomePage/HomeController
 *     Logic controller
 * 
 *
 *
 *
 *
 *
 * *Proprietary and confidential
 * Written by Christopher Stenqvist, October 2016
 */


//HomeController

dbApp.controller('homeController',['$scope','$http','socketFactory',function($scope, $http,socketFactory){

	initTableData();

	function initTableData(){
		$http.get('/init').success(function(data){
			$scope.titles = data[0];
			$scope.rows = data[1];
		});
	}

	socketFactory.socket().on("refreshTable",function(){
		initTableData();
	})

	//button that emits
	$scope.reload = function(){
		socketFactory.socket().emit('reload');
	};


}]).filter('cleanMe',function(){
	return function(input){
		return input[0].replace(/[^a-zA-Z_ ]/g, "");
	}
})
.factory('dbService',function($http){
	return{
		getData: function(callback){
				$http.get('/load').succes(function(data){});
		}
	}
})
.factory('socketFactory', function() {
	var s = this;
 	s.socket = io.connect();
	  return {
	   socket: function() {
	    	return s.socket;
	    }
  };
});