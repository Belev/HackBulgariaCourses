"use strict";

var https = require('https'),
    fs = require('fs'),
    Q = require('q'),
    utils = require('./utils'),
    fileAddress = process.argv[2],
    validUrlStarts = ['http', 'https', 'www'],
    validUrlEndings = ['.ini', '.json'],
    GET_FROM_FS = 'get from file system',
    GET_FROM_URL = 'get from url address';

var exists = function (address) {
    var deferred = Q.defer();

    fs.exists(address, function (exists) {
        if (exists) {
            deferred.resolve('get from file system');
        } else {
            if (utils.isValidUrl(address, validUrlStarts, validUrlEndings)) {
                deferred.resolve('get from url address');
            } else {
                deferred.reject('Invalid file name or file url address.');
            }
        }
    });

    return deferred.promise;
};

var readData = function (response) {
    var deferred = Q.defer();

    if (response === GET_FROM_FS) {
        fs.readFile(fileAddress, function (err, data) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(data.toString());
            }
        });
    } else if (response === GET_FROM_URL) {
        https.get(fileAddress, function (response) {
            response.on('data', function (data) {
                deferred.resolve(data.toString());
            });
        });
    }

    return deferred.promise;
};

var createFileContent = function (data) {
    var deferred = Q.defer();
    var fileContent = '',
        type = '';

    if (fileAddress.indexOf('.json') > -1) {
        fileContent = utils.createIniConfigFileContent(data.toString());
        type = 'ini';
    } else {
        fileContent = utils.createJsonConfigFileContent(data);
        type = 'json';
    }

    deferred.resolve({
        content: fileContent,
        type: type,
        name: 'config'
    });

    return deferred.promise;
};

var writeFileToFileSystem = function (response) {
    utils.writeFile(response.name, response.type, response.content);
};

exists(fileAddress)
    .then(readData)
    .then(createFileContent)
    .then(writeFileToFileSystem)
    .fail(function (err) {
        console.log(err);
    });