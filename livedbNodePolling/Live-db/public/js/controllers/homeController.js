//HomeController
'use strict';

dbApp.controller('homeController',['$scope','$http',function($scope, $http){

	initTables();
	function initTables(){
		getTableData();
	}

	function getTableData(){
		$http.get('/load').success(function(data){
			$scope.rows=data;
			getTitles();
		});
	};

}]);
