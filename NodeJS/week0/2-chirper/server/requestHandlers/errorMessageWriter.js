"use strict";

module.exports = {
    write: function (errorDetails, res) {
        if (errorDetails.statusCode && errorDetails.contentType) {
            res.writeHead(errorDetails.statusCode, errorDetails.contentType);
        }

        res.write(JSON.stringify({Error: errorDetails.message}));
        res.end();
    },
    writeNotFound: function (res) {
        res.writeHead(404, 'application/json');
        res.write(JSON.stringify({Error: 'Not found.'}));
        res.end();
    }
};