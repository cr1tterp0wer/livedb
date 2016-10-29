# Database Monitor

##I.
(Install node.js and create an alias)
  1.install oracle drivers for dependencies http://www.oracle.com/technetwork/topics/winx64soft-089540.html

    *download "Instant Client Package - Basic:"
    *download "*Instant Client Package - SDK:"
    -extract Basic and SDK
    -create a folder C:/oracle/instantclient/
    -move CONTENTS of BASIC + SDK into C:/oracle/instantclient/
    -create a path variable;  C:/oracle/instantclient;


##II.
  1. install `npm` command line tool `https://nodejs.org/en/download/`
  2. install 'socket.io' dependency: 'npm -g install socket.io'
  2. install `bower` command line tool: `npm install -g bower`
  3. run this command: `git clone https://github.com/cr1tterp0wer/livedb.git`
  4. navigate to directory `livedbNodPolling/live-db/`
  5. run this command: `npm install`
  6. watch as all the dependencies are magically downloaded
  7. (confirm bower was also executed)
  8. locate index.js, change the connection params inside dbConfig.js to match your database credentials
  9.  change file dbListener-script01.sql and dbListener-script02.sql
         replace <USR_NAME> with your username and  <SERVER_ADDRESS:PORT> with 
        the server address + port (should be 3000 by default),
        replace jsao_super_cities with your table name if you do not want to load
        the default table.
  10.  Run the sql scripts in order dbListener-script01.sql then
        dbListener-script02.sql


  . run this command to start the Node.js server: `node index.js`

##III.
  navigate to `localhost:3000`
  ~~use the button to refresh all instances of connected clients~~


##IV. FILE SYSTEM

1.assets:           all additional non-essential, styling/js assets

2.bower_components: front-end dependencies

3.db:               backup dummy database file

4.node_modules:     node dependencies

5.public:           public files

6.static:           static files

7.views:            angularjs partials

...

8.`bower.json` + `package.json`: manifest files


