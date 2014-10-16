"use strict";

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 1515;

require('../scraper/config/mongoose')(require('../scraper/config/config')['development']);
require('./config/express')(app);
require('./config/routes')(app);

app.listen(port);

console.log('Server listening on port: ' + port);