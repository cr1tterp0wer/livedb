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
    return{
      query:(request,response,io,context)=>{
        oracledb.getConnection(
          {
            user          : dbConfig.user,
            password      : dbConfig.password,
            connectString : dbConfig.connectString
          },
          function(err, conn)
          {
            var self=this;
            //get table names + values
            var get_table_names = "SELECT COLUMN_NAME FROM USER_TAB_COLUMNS WHERE TABLE_NAME LIKE '"+dbConfig.dbTable+"'";
            var get_table_values      = "SELECT * FROM "+dbConfig.dbTable;
            var result = new Object();

            if (err) {
              console.error(err.message);
              return;
            }

            querySingleTable(get_table_names,get_table_values);
              //GetsingleTable
             function querySingleTable(table_name_query, table_value_query){
               dbExecute(conn, table_name_query, function(data){ 
                 dbExecute(conn,table_value_query,"");
               });
             }

            function dbExecute(c,command,callback){

                var self = this;
                c.execute(
                   command,              
                    function(err, result)
                    {
                      if (err) {
                        console.error(err.message);
                        releaseConn(c);
                        return;
                      }
                     var data = JSON.stringify(result.rows) ;
                       if (typeof callback === "function"){
                        data = "["+data+ ",";
                        response.write(data);
                        callback(data);
                       }
                       else{
                        doRelease(conn);
                        data = data+"]";
                        response.write(data);
                        if(context.toUpperCase() !== "INIT")
                          io.emit("refreshTable");
                        response.send();
                      }
                    });
                }
          });

        function doRelease(conn)
        {
          conn.release(
            function(err) {
              if (err) {
                console.error(err.message);
              }
            });
        }
      }
    };
  }


}