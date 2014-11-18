"use strict";

var express = require("express"),
    app = express(),
    request = require('request'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    utils = require('./utils');

var userCookies = new utils.SimpleHashSet();

app.use(cookieParser());
app.use(session({secret: 'SECRET_MAGIC', resave: false, saveUninitialized: true}));

app.get('/proxy', function (req, res) {
    var query = req.query,
        requestStream,
        linkTransformStream;

    if (!query.url) {
        res.status(403).send('You should provide url query parameter.');
    }
    else {
        Object.keys(req.cookies).forEach(function (cookieKey) {
            if (cookieKey === 'connect.sid') {
                userCookies.push(req.cookies[cookieKey]);
            }
        });

        requestStream = request({
            url: query.url,
            cookie: req.headers['cookie']
        });

        linkTransformStream = new utils.LinkTransform('http://localhost:8080/proxy?url=');

        requestStream
            .pipe(linkTransformStream)
            .pipe(res);
    }
});

app.listen(8080);
console.log('Server listening on port: ' + 8080);