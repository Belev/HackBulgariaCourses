"use strict";

var express = require('express'),
    app = express(),
    config = require('./config/config')['development'];

require('./config/mongoose')(config);
require('./config/routes')(app);

app.listen(config.port);

console.log('Server listening on port: ' + config.port);