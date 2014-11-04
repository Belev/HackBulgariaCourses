var express = require('express'),
    app = express(),
    config = require('./config/config')['development'],
    SnippetController = require('./controllers/snippetsController');

require('./config/mongoose')(config);
require('./config/express')(app);
require('./config/routes')(app, SnippetController);

app.listen(config.port);

console.log('Server listenning on port: ' + config.port);