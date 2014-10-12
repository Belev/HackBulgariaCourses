"use strict";
var contentType = {'Content-Type': 'application/json'};

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
        res.writeHead(404, contentType);
        res.write('Not found.');
        res.end();
    }

    function getAllChirps(res, controller) {
        controller.getAllChirps(function (err, data) {
            if (err) {
                res.writeHead(400, contentType);
                res.write(JSON.stringify({Error: err}));
                return;
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(data));
        });
    }

    function getMyChirps(res, controller, args) {
        controller.getMyChirps(args.user, args.key, function (err, data) {
            if (err) {
                res.writeHead(400, contentType);
                if (err === 'Such user does not exists.') {
                    res.write(JSON.stringify({Error: 'Such user does not exists.'}));
                } else if (err === 'The provided user key is not for your account.') {
                    res.write(JSON.stringify({Error: 'The provided user key is not for your account.'}));
                } else if (err === 'You can not see your chirps because you are not authenticated.') {
                    res.write(JSON.stringify({Error: 'You can not see your chirps because you are not authenticated.'}));
                } else {
                    res.write(JSON.stringify({Error: err}));
                }

                res.end();
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(data));
        });
    }

    function getAllUsers(res, controller) {
        controller.getAllUsers(function (err, data) {
            if (err) {
                res.writeHead(400, contentType);
                res.write(JSON.stringify({Error: err}));
                res.end();
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(data));
        })
    }

    function getChirpsById(res, controller, args) {
        controller.getChirpByIdOrUserId(args.chirpId, args.userId, function (err, data) {
            if (err) {
                if (err === 'Can not get chirps without some kind of id.') {
                    res.write(JSON.stringify({Error: 'Can not get chirps without some kind of id.'}));
                } else {
                    res.write(JSON.stringify({Error: err}));
                }

                res.end();
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(data));
        })
    }
}

module.exports = processGetRequest;