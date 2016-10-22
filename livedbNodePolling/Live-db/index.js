"use strict";

const express = require('express');
const app     = express();
const mysql   = require('mysql');



// Run server to listen on port 3000.
const server = app.listen(3000, function() {
  console.log('listening on *:3000');
});

const io = require('socket.io')(server);

var conn  = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'mama'
});

app.use(express.static('static'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/public',  express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname +'/views'));
app.use('/assets', express.static(__dirname +'/assets'));

io.on('connection',(socket)=>{
	console.log('a user connected');

	socket.on('disconnect',() =>{
		console.log('user disconnected');
	});
});

//get express routes
app.get('/',(req,res)=>{
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/load', function(request, response){
  conn.query("SELECT * FROM filing", function(error, rows, fields){
    if(error) throw error;
    else
      return response.end(JSON.stringify(rows));
  });

});


////////////DB -DEPRECATED!

var connectMySQL = function(c){
  c.connect();
  c.query('SELECT 1 + 1 AS solution', function(error,rows, fields){
  if(error) throw error;
  console.log('MYSQL SOLUTION:', rows[0].solution);
  });
  c.end();
};
var endMySQL = function(c){
  c.end();
}
