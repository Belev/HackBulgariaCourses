"use strict";

var getRequestHandler = require('./getRequestHandler'),
    postRequestHandler = require('./postRequestHandler'),
    deleteRequestHandler = require('./deleteRequestHandler');

module.exports = {
    processGetRequest: getRequestHandler,
    processPostRequest: postRequestHandler,
    processDeleteRequest: deleteRequestHandler
};