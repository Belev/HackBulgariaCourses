"use strict";
var express = require('express'),
    app = express();

require('./config/express')(app);
require('./config/routes')(app);

app.listen(8080);
console.log('Server listening on port: 8080');