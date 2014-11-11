"use strict";

var express = require('express'),
    bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(function(err, req, res, next) 	{
        err.status = 400;
        next(err);
    });
};