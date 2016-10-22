var express = require('express');
var app     = express();
var port    =  process.env.PORT || 3000; 
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var path    = require('path');
var router  = express.Router();
var mysql   = require('mysql');



/////////////INSTANCE VARS
var mysql = require('mysql');
var conn  = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'mama'
});



users = [];
connections = [];
console.log('Server running...');

//init applicaton
app.use( express.static(__dirname + '/'));




//ROUTES
 app.get('/', function(request, response){

 	response.sendFile(__dirname + '/public/index.html');
    //init the mysql table
   
    connectMySQL(conn);






 	//our connect
 // 	io.sockets.on('connection', function(socket){
 // 		connections.push(socket);
 // 		console.log('Connected:: %s sockets connected.', connections.length);
	// });//ON_CONN
});//GET '/'
app.get('/load', function(request, response){
	conn.query("SELECT * FROM filing", function(error, rows, fields){
		if(error) throw error;
		else
			return response.end(JSON.stringify(rows));
	});

});
app.listen(port);


////////////DB
var connectMySQL = function(c){
	//c.connect();
	c.query('SELECT 1 + 1 AS solution', function(error,rows, fields){
	if(error) throw error;
	console.log('MYSQL SOLUTION:', rows[0].solution);
	});
};
var endMySQL = function(c){
	c.end();
}
