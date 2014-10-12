"use strict";

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/chirpapi',
        port: process.env.PORT || 8080
    }
};