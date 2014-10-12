"use strict";

var http = require('http'),
    url = require('url'),
    ChirpSystemController = require('./server/controllers/ChirpSystemController'),
    requestsHandler = require('./server/requestHandlers/requestsHandler'),
    port = 9615;

ChirpSystemController.init(require('./server/config/config')['development']);

http.createServer(function (req, res) {
    var data = '';

    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function () {
        var parsedUrl = url.parse(req.url, true),
            dataArguments = {};

        if (req.method.toUpperCase() === 'GET') {
            dataArguments = parsedUrl.query;

            requestsHandler.processGetRequest(parsedUrl.pathname, res, ChirpSystemController, dataArguments);
        } else if (req.method.toUpperCase() === 'POST') {
            dataArguments = data.toString() || {};

            requestsHandler.processPostRequest(dataArguments, parsedUrl.pathname, res, ChirpSystemController);
        } else if (req.method.toUpperCase() === 'DELETE') {
            dataArguments = parsedUrl.query;

            requestsHandler.processDeleteRequest(dataArguments, parsedUrl.pathname, res, ChirpSystemController);
        } else {
            res.writeHead(400, 'application/json');
            res.end();
        }
    });
}).listen(port);

console.log('Server listening on port ' + port);