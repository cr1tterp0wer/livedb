//HomeController
'use strict';

dbApp.controller('homeController',['$scope','$http',function($scope, $http){


	var socket = io.connect();
    
    //when we are refreshed
    socket.on('refresh',function(data){
      console.log('refreshed');
      getTableData();
    });

	initTables();
	function initTables(){
		getTableData();
	}

	function getTableData(){
		$http.get('/load').success(function(data){
			$scope.rows=data;
		});
	};
	$scope.reload = function(){
		getTableData();
		socket.emit('broadcast refresh', 200);
		
	};

	

}]);
