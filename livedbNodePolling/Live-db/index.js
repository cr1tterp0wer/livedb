/* Copyright (CC) Christopher Stenqvist, capodacac@gmail.com - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * without the express permission of Christopher Stenqvist
 *
 * This file is part of livedb, https://github.com/cr1tterp0wer/livedb.git
 *
 *
 ******************************************
 * Name:index.js - Database Request File -
 * ****************************************
 * Server file - Loads Node.js Server
 *   Handles connection sockets and routes 
 * 
 *
 *
 *
 *
 *
 * *Proprietary and confidential
 * Written by Christopher Stenqvist, October 2016
 */

"use strict";

const express = require('express');
const app     = express();
const db      = require('./dbReqs.js');


// Run server to listen on port 3000.
const server = app.listen(3000, function() {
  console.log('listening on *:3000');
});

var io = require('socket.io')(server);


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

app.get('/load', function(req, res){
  var dbquery =db();
  dbquery.query(req,res,io,"load");
});
app.get('/init',function(req,res){
  var dbquery = db();
  dbquery.query(req,res,io,"init");
})

io.sockets.on('connection',function(socket){
   connections.push(socket);
   console.log('Connected: %s sockets connected', connections.length);
  
   //DISCONNECT ALERT
   socket.on('disconnect', function(data){
     connections.splice(connections.indexOf(socket),1);
     console.log('Disconnected: %s sockets now connected.',connections.length);
   });
    socket.on('reload',function(data){
      io.sockets.emit('refreshTable');
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
