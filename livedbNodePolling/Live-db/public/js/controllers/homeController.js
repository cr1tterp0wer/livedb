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
			// titles["TITLES",<TABLE_NAME>,...], 
			// rows  [<TABLE_NAME>,...]
			 $scope.titles = [[],[]];
			 $scope.rows = [[],[]];
			 $scope.rowsIndex = 0;
			 for(k=0;k<data.length;k++){
				for(i=0;i<data[k].length;i++){
					//extract rows
					for(q=0;q<data[k][i].length;q++){
						if(data[k][i][q] != null && data[k][i][q].toString().toUpperCase() == "TITLE" ){
							//GET TITLES_COLUMNS
 							 $scope.titles[k].push( data[k][i][2]); 
 							 //PUT TABLENAME IN TITLES_COLUMN
 							 if(data[k].length == (i+1) ){
 							 	$scope.titles[k].unshift(data[k][i][1]);
 							 }
 						}
					}
					if(data[k][i] != null  && data[k][i][0].toString().toUpperCase() != "TITLE" ){
	 					$scope.rows.push(data[k][i]);
	 					$scope.rowsIndex++;
 					}
				}
			}
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
}).directive('showTab', function () {
    return {
        link: function (scope, element, attrs) {
            element.click(function (e) {
                e.preventDefault();
                jQuery(element).tab('show');
            });
        }
    };
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