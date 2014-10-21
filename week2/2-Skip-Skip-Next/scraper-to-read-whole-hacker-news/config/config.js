"use strict";

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/hackernews-keywords',
        port: process.env.PORT || 5000
    }
};