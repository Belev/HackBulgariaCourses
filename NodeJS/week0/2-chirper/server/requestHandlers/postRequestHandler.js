"use strict";
var contentType = {'Content-Type': 'application/json'},
    errorMessageWriter = require('./errorMessageWriter');

function processPostRequest(data, urlPathName, res, controller) {
    data = JSON.parse(data);

    if (urlPathName === '/chirp') {
        createChirp(data, res, controller);
    } else if (urlPathName === '/register') {
        registerUser(data, res, controller);
    } else {
        errorMessageWriter.writeNotFound(res);
    }

    function createChirp(data, res, controller) {
        controller.createChirp(data.username, data.key, data.chirpText, function (err, chirpId) {
            if (err) {
                var errorDetails = {
                    statusCode: 400,
                    contentType: contentType,
                    message: err
                };

                errorMessageWriter.write(errorDetails, res);
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify({chirpId: chirpId}));
        });
    }

    function registerUser(data, res, controller) {
        controller.registerUser(data.username, function (err, user) {
            if (err) {
                var errorDetails = {
                    statusCode: 409,
                    contentType: contentType,
                    message: err
                };

                errorMessageWriter.write(errorDetails, res);
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(user));
        });
    }
}

module.exports = processPostRequest;