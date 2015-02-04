"use strict";

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    config = require('./config/config')['development'];

require('./config/mongoose')(config);
require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port);

console.log('Server listening on port: ' + config.port);