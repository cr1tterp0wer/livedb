/* Copyright (CC) Christopher Stenqvist, capodacac@gmail.com - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * without the express permission of Christopher Stenqvist
 *
 * This file is part of livedb, https://github.com/cr1tterp0wer/livedb.git
 *
 *
 ******************************************
 * @dbReqs.js - Database Request File -
 * ****************************************
 * Issues Database requests based on connection info 
 * found in dbconfig.js
 *
 *
 *
 *
 *
 * *Proprietary and confidential
 * Written by Christopher Stenqvist, October 2016
 */
 

var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var async    = require('async');

if(dbConfig.dbType.toUpperCase() === 'MYSQL'){
  module.exports = () =>{
    var mysql    = require('mysql');
    var conn  = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mama'
    });
    return{
      queryFiling: (request, response) =>{
        conn.query("SELECT * FROM filing", function(error, rows, fields){
          if(error) throw error;
          else
            return response.end(JSON.stringify(rows));
        });
      }
    };
  };
}else{
  module.exports = () =>{
    var dbQuery = new Object();
    dbQuery.get_column_names  = [];
    dbQuery.get_table_values  = [];
    dbQuery.result ="";
    initDBQuerys();

    function initDBQuerys(){
      var k;
      dbConfig.dbTables.forEach(function(e,i,arr){
        var n =  "SELECT COLUMN_NAME FROM USER_TAB_COLUMNS WHERE TABLE_NAME LIKE '"+e+"'";
        var t = "SELECT * FROM "+e;
        dbQuery.get_column_names.push(n);
        dbQuery.get_table_values.push(t);
      });
    }
    return{
      
      getdbQueryVars:()=>{
        return dbQuery;
      },
      queryFall:(request,response, io, ctx)=>{
        var context = ctx;
        //[TITLE,TABLENAME,....]
          function loopQueryTables(conn,callback){
            var arr = dbQuery.get_column_names;
            var data="[";
            var p = [];
            for(i=0;i<arr.length;i++){
              p.push(queryMe(conn,arr[i],"TITLE",dbConfig.dbTables[i]).then(function(d){data +=d;}));
            }
            return Promise.all(p).then(function(){return callback(null, conn, data)});
          }

          //fired after loopQuerys, passes data here for appension
          // [TABLENAME,....]
          function loopQueryValues(conn,d,callback){
            var arr = dbQuery.get_table_values;
            var data=d;
            var p = [];
            for(i=0;i<arr.length;i++){
              p.push(queryMe(conn,arr[i],"",dbConfig.dbTables[i]).then(function(d){data +=d;}));
            }
            return Promise.all(p).then(function(){return callback(null, conn, data)});            
          }

          function queryMe(conn,e,title,table_name){
            var query =e;
            return conn.execute(
              query).then(
              function(result) {
                  if(title.toUpperCase() == "TITLE"){
                    result.rows.forEach(function(e,i,arr){e.unshift(table_name);});
                    result.rows.forEach(function(e,i,arr){e.unshift(title);});
                    var d = result.rows;
                  }
                  else
                    result.rows.forEach(function(e,i,arr){e.unshift(table_name);});
                    var d = result.rows;
                    d     = JSON.stringify(d)+ ",";
                    return d;
                }
            );
          }

          function writeMe(conn,data,callback){

            data = data.substring(0,data.length-1)+"]";
            response.write(data);
            return callback(null,data);
          }
          function sendMe(conn,callback){
            var p=[];
            p.push(response.send());
            return Promise.all(p).then(function(){callback(null);});
          }
          function reloadMe(){
            if(context.toUpperCase() != "INIT")
              io.emit('refreshTable');
          }
          function emit(t){
            io.emit(t);
          }
          function releaseConn(c)
          {
            c.release(
              function(err) {
                if (err) {
                  console.error(err.message);
                }
              });
          }
          // Insert and query the RAW data
          async.waterfall(
          [
            function(callback) {
              oracledb.getConnection(
              {
                user          : dbConfig.user,
                password      : dbConfig.password,
                connectString : dbConfig.connectString
              },
              callback);
            },
            loopQueryTables,
            loopQueryValues,
            writeMe,
            sendMe,
            reloadMe
          ],
          function (err, conn) {
            if (err) {releaseConn(conn);return; }
            conn.release(function (err) { if (err) console.error(err.message); });
          });
      }
    };//end return
  }


}