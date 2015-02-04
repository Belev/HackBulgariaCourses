"use strict";
var contentType = {'Content-Type': 'application/json'},
    errorMessageWriter = require('./errorMessageWriter');

function processGetRequest(urlPathName, res, controller, args) {
    if (urlPathName === '/all_chirps') {
        getAllChirps(res, controller);
    } else if (urlPathName === '/my_chirps') {
        getMyChirps(res, controller, args);
    } else if (urlPathName === '/all_users') {
        getAllUsers(res, controller);
    } else if (urlPathName === '/chirps') {
        getChirpsById(res, controller, args);
    } else {
        errorMessageWriter.writeNotFound(res);
    }

    function getAllChirps(res, controller) {
        controller.getAllChirps(function (err, data) {
            if (err) {
                var errorDetails = {
                    statusCode: 400,
                    contentType: contentType,
                    message: err
                };

                errorMessageWriter.write(errorDetails, res);
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(data));
        });
    }

    function getMyChirps(res, controller, args) {
        controller.getMyChirps(args.user, args.key, function (err, data) {
            if (err) {
                var errorDetails = {
                    statusCode: 400,
                    contentType: contentType,
                    message: err
                };

                errorMessageWriter.write(errorDetails, res);
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(data));
        });
    }

    function getAllUsers(res, controller) {
        controller.getAllUsers(function (err, data) {
            if (err) {
                var errorDetails = {
                    statusCode: 400,
                    contentType: contentType,
                    message: err
                };

                errorMessageWriter.write(errorDetails, res);
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(data));
        })
    }

    function getChirpsById(res, controller, args) {
        controller.getChirpByIdOrUserId(args.chirpId, args.userId, function (err, data) {
            if (err) {
                var errorDetails = {
                    message: err
                };

                errorMessageWriter.write(errorDetails, res);
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(data));
        })
    }
}

module.exports = processGetRequest;