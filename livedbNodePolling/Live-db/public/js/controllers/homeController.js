//HomeController
'use strict';

dbApp.controller('homeController',['$scope','$http','socketFactory',function($scope, $http,socketFactory){

	initTables();

	//what get's proc'd
	socketFactory.socket().on("refresh",function(){
		console.log("broadcast received");
		getTableData();
	});

	//function to call all sockets
	socketFactory.socket().on('broadcast refresh',function(){
		console.log('broadcast sent');
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
		console.log('button clicked');
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