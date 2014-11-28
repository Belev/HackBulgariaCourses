var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);
app.get('/chatroom', routes.chatroom);
app.use('/users', users);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

var server = http.createServer(app)
    .listen(8080, function () {
        console.log('Express server listening on port ' + server.address().port);
    });

require('./routes/sockets.js').initialize(server);