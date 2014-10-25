"use strict";
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.all("*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", ["X-Requested-With", "Content-Type", "Access-Control-Allow-Methods", "x-search-info"]);
        res.header("Access-Control-Allow-Methods", ["GET"]);
        next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};