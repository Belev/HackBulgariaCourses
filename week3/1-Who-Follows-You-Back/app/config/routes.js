"use strict";

var handler = require('../requestHandlers/graphRequestHandler');

module.exports = function (app) {
    app.post('/createGraphFor', handler.createGraphFor);
    app.get('/graph/:graphId', handler.graphById);
    app.get('/mutually_follow/:graphId/:username', handler.mutuallyFollow);
    app.get('/steps_to/:graphId/:username', handler.stepsTo)
};