"use strict";
var contentType = {'Content-Type': 'application/json'},
    errorMessageWriter = require('./errorMessageWriter');

function processDeleteRequest(data, urlPathName, res, controller) {
    if (urlPathName === '/chirp') {
        deleteChirp(data, res, controller);
    } else {
        errorMessageWriter.writeNotFound(res);
    }

    function deleteChirp(data, res, controller) {
        controller.deleteChirp(data.key, data.chirpId, function (err, deletedChirp) {
            if (err) {
                var errorDetails = {
                    statusCode: 403,
                    contentType: contentType,
                    message: err
                };

                errorMessageWriter.write(errorDetails, res);
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(deletedChirp));
        });
    }
}

module.exports = processDeleteRequest;