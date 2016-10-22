// dbApp.factory('socketFactory', function($rootScope){
// 	var socket = io.connect();
// 	return{
// 		on:function(name, callback){
// 			socket.on(name, function(args){
// 				var arg = args;
// 				$rootScope.$apply(function(){
// 					callback.apply(socket, arg);
// 				});	
// 			})
// 		},
// 		emit:function(name, data, callback){
// 			socket.on(name, data, function(args){
// 				var arg = args;
// 				$rootScope.$apply(function(){
// 					if(callback){
// 						callback.apply(socket,arg);
// 					}
// 				})
// 			});
// 		}
// 	}

// });