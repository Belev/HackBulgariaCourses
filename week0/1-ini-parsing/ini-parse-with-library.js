"use strict";

var fs = require('fs'),
    iniParser = require('iniparser'),
    fileName = process.argv[2] || './config.ini';

iniParser.parse(fileName, function (err, data) {
    if (err) {
        console.log(err);
        return;
    }

    var dataAsJson = JSON.stringify(data);

    fs.writeFile('./config.json', dataAsJson, function (err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('File was written successfully. Look in your directory.');
    });
});