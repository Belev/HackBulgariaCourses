"use strict";

module.exports = function (app) {
    app.all("*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", ["X-Requested-With", "Content-Type", "Access-Control-Allow-Methods"]);
        res.header("Access-Control-Allow-Methods", ["GET"]);
        next();
    });
};