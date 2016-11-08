/* Copyright (CC) Christopher Stenqvist, capodacac@gmail.com - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * without the express permission of Christopher Stenqvist
 *
 * This file is part of livedb, https://github.com/cr1tterp0wer/livedb.git
 *
 *
 ******************************************
 * Name: dbconfig.js - Database Configuration -
 * ****************************************
 * Module creating Database parameters
 *
 *
 *
 *
 *
 * *Proprietary and confidential
 * Written by Christopher Stenqvist, October 2016
 */
 
//Connection Type
module.exports = {
  dbType        : 'ORACLE',
  dbTables		: ['JSAO_SUPER_CITIES','EV_BAS_HISTORY'],
  user          : process.env.NODE_ORACLEDB_USER || "ROOT",
  password      : process.env.NODE_ORACLEDB_PASSWORD || "welcome",
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost:1521/xe",
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
