"use strict";

var https = require('https'),
    fs = require('fs'),
    utils = require('./utils'),
    fileAddress = process.argv[2],
    possibleUrlStarts = ['http', 'https', 'www'],
    validUrlEndings = ['.ini', '.json'];

fs.exists(fileAddress, function (exists) {
    if (exists) {
        fs.readFile(fileAddress, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }

            var content;
            if (fileAddress.indexOf('.json') > -1) {
                content = utils.createIniConfigFileContent(data.toString());
                utils.writeFile('config', 'ini', content);
            } else {
                content = utils.createJsonConfigFileContent(data.toString());
                utils.writeFile('config', 'json', content);
            }
        });
    } else {
        if (utils.isValidUrl(fileAddress, possibleUrlStarts, validUrlEndings)) {
            https.get(fileAddress, function (response) {
                response.on('data', function (data) {
                    var content = utils.createIniConfigFileContent(data.toString());
                    utils.writeFile('config', 'json', content);
                });
            });
        } else {
            console.log('Invalid file name or url address.');
        }
    }
});