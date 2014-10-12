"use strict";
var contentType = {'Content-Type': 'application/json'};

function processPostRequest(data, urlPathName, res, controller) {
    data = JSON.parse(data);

    if (urlPathName === '/chirp') {
        createChirp(data, res, controller);
    } else if (urlPathName === '/register') {
        registerUser(data, res, controller);
    } else {
        res.writeHead(404, contentType);
        res.write('Not found.');
        res.end();
    }

    function createChirp(data, res, controller) {
        controller.createChirp(data.username, data.key, data.chirpText, function (err, chirpId) {
            if (err) {
                res.writeHead(400, contentType);

                if (err === 'You are not authenticated to create new chirp.') {
                    res.write(JSON.stringify({Error: 'You are not authenticated to create new chirp.'}));
                } else if (err === 'Such user does not exists.') {
                    res.write(JSON.stringify({Error: 'Such user does not exists.'}));
                } else if (err === 'The provided user key is not for your account.') {
                    res.write(JSON.stringify({Error: 'The provided user key is not for your account.'}));
                } else {
                    res.write(JSON.stringify({Error: err}));
                }

                res.end();
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify({chirpId: chirpId}));
        });
    }

    function registerUser(data, res, controller) {
        controller.registerUser(data.username, function (err, user) {
            if (err) {
                if (err === 'User with the same username already exists.') {
                    res.writeHead(409, contentType);
                    res.write(JSON.stringify({Error: 'User with the same username exists.'}));
                } else {
                    res.writeHead(400, contentType);
                    res.write(JSON.stringify({Error: err}));
                }
                res.end();
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(user));
        });
    }
}

module.exports = processPostRequest;