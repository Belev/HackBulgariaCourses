"use strict";

var mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    config = require('./config/config')['development'],
    controllers = require('./controllers');

require('./config/mongoose')(config, mongoose);
require('./config/express')(app);
require('./config/routes')(app, controllers);

app.listen(config.port);

console.log('Server listenning on port: ' + config.port);