"use strict";

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, '../public')));
};