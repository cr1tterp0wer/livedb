//HomeController
'use strict';

dbApp.controller('homeController',['$scope','$http','socketFactory',function($scope, $http,socketFactory){

	initTables();

	//what get's proc'd
	socketFactory.socket().on("refresh",function(){
		console.log("refreshed!");
		getTableData();
	});

	//function to call all sockets
	socketFactory.socket().on('broadcast refresh',function(){
		io.sockets.emit('refresh');
	});

	//	initTables();
	function initTables(){
		getTableData();
	}

	function getTableData(){
		$http.get('/load').success(function(data){
			$scope.rows=data;
		});
	};

	//button that emits
	$scope.reload = function(){
		socketFactory.socket().emit('broadcast refresh')
	};


}])
.factory('socketFactory', function() {
	var s = this;
 	s.socket = io.connect();
	  return {
	   socket: function() {
	    	return s.socket;
	    }
  };
});