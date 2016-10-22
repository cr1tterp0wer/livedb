"use strict";

const express = require('express');
const app     = express();
const mysql   = require('mysql');



// Run server to listen on port 3000.
const server = app.listen(3000, function() {
  console.log('listening on *:3000');
});

var io = require('socket.io')(server);

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

var users = [];
var connections = [];


//get express routes
app.get('/',function(req,res){
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/load', function(request, response){
  conn.query("SELECT * FROM filing", function(error, rows, fields){
    if(error) throw error;
    else
      return response.end(JSON.stringify(rows));
  });
});


//CONNECT ALERT
io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
 
  //DISCONNECT ALERT
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected: %s sockets now connected.',connections.length);
  });

 //EMIT REFRESH
  socket.on('broadcast refresh',function(data){
    var code = 'refreshed';
    io.sockets.emit('refresh',{response:code});
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
