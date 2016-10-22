# Database Monitor

##I.
(Install node.js and create an alias)

##II.
  1. install `npm` command line tool `https://nodejs.org/en/download/`
  2. install `bower` command line tool: `npm install -g bower`
  3. run this command: `git clone https://github.com/cr1tterp0wer/livedb.git`
  4. navigate to directory `livedbNodPolling/live-db/`
  5. run this command: `npm install`
  6. watch as all the dependencies are magically downloaded
  7. (confirm bower was also executed)
  8. locate index.js, change the mysql connection params to match your database credentials
  9. run this command to start the Node.js server: `node index.js`

##III.
  navigate to `localhost:3000`
  use the button to refresh all instances of connected clients


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


