"use strict";
var auth = require('../config/auth');

module.exports = function (app, controllers) {
    app.get('/', function (req, res) {
        res.render('index', {user: req.user});
    });
    app.get('/about', function (req, res) {
        res.render('about', {user: req.user});
    });
    app.get('/register', function (req, res) {
        res.render('register', {user: req.user});
    });
    app.get('/login', function (req, res) {
        res.render('login', {user: req.user});
    });

    app.post('/register', controllers.users.createUser);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('*', function (req, res) {
        res.render('index', {user: req.user});
    });
};