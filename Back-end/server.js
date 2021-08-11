const http = require('http');                 //..Called up on NodeJS to use the http protocol to communicate with server..

const app = require('./app');                // Import api app

const conn = require("./connection");        

app.set('port', process.env.PORT || 3000);   //.Telling tha App on what Port it will be returning.

const server = http.createServer(app);      // Server creation
server.listen(process.env.PORT || 3000);    //.The env. or port that the server will be listening to.

console.log('Listening on port 3000!');