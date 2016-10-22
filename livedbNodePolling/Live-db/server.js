var express = require('express');
var app     = express();
var port    = 3000; 
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var path    = require('path');

users = [];
connections = [];

server.listen(3000);

console.log('Server running...');

//init applicaton
app.use( express.static(__dirname + '/'));
//Route to home.html
// app.use(function(req, res){
// 	res.sendFile(__dirname + '/views/index.html');
// });


//ROUTES
 app.get('/', function(request, response){

 	response.sendFile(__dirname + '/public/index.html');

 	//our connect
 	io.sockets.on('connection', function(socket){
 		connections.push(socket);
 		console.log('Connected:: %s sockets connected.', connections.length);
	});//ON_CONN
});//GET '/'