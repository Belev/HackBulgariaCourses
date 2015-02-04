"use strict";

var fs = require('fs'),
    MongoClient = require('mongodb').MongoClient,
    config = require('./config'),
    jsonFileToUse = process.argv[2];

var helpers = (function () {
    function isValidFileExtension(file) {
        return file.substr(file.length - 4) === 'json';
    }

    function getFileName(file) {
        var splittedFileInfo = file.split('.');

        return splittedFileInfo[0];
    }

    function logError(err) {
        console.log('Error: ' + err);
    }

    return {
        isValidFileExtension: isValidFileExtension,
        getFileName: getFileName,
        logError: logError
    }
})();

if (!helpers.isValidFileExtension(jsonFileToUse)) {
    helpers.logError('You have entered invalid file type to put in the database.');
    return;
}

if (!fs.existsSync('./' + jsonFileToUse)) {
    helpers.logError('The file does not exists.');
    return;
}

MongoClient.connect(config['connectionUrl'], function (err, db) {
    if (err) {
        helpers.logError(err);
        return;
    }

    console.log('Database up and running...');

    var fileName = helpers.getFileName(jsonFileToUse),
        collection = db.collection(fileName);

    fs.readFile('./' + jsonFileToUse, function (err, content) {
        var parsedContent = JSON.parse(content);

        collection.insert(parsedContent, function (err, insertedData) {
            if (err) {
                helpers.logError(err);
                return;
            }

            console.log('You have inserted: ' + insertedData.length + ' items.');
            db.close();
        })
    });
});