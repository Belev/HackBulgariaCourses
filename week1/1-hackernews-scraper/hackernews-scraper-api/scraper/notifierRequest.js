"use strict";

var request = require('request');

module.exports = function (url) {
    request.post(url);
};