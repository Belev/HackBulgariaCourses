var http = require('http');
var express = require('express');
var controllers = require('./controllers');

var app = express();

require('./config/express')(app);
require('./config/routes')(app, controllers);

var server = http
    .createServer(app)
    .listen(8080, function () {
        console.log('Express server listening on port ' + server.address().port);
    });

require('./config/socket_io.js').initialize(server);