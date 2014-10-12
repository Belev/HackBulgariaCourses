"use strict";
var contentType = {'Content-Type': 'application/json'};

function processDeleteRequest(data, urlPathName, res, controller) {
    if (urlPathName === '/chirp') {
        deleteChirp(data, res, controller);
    } else {
        res.writeHead(404, contentType);
        res.write('Not found.');
        res.end();
    }

    function deleteChirp(data, res, controller) {
        controller.deleteChirp(data.key, data.chirpId, function (err, deletedChirp) {
            if (err) {
                res.writeHead(403, contentType);

                if (err === 'User with this key does not exists.') {
                    res.write(JSON.stringify({Error: 'User with this key does not exists.'}));
                } else if (err === 'Such chirp does not exists or you are not the creator of the chirp.') {
                    res.write(JSON.stringify({Error: 'Such chirp does not exists or you are not the creator of the chirp.'}));
                } else {
                    res.write(JSON.stringify({Error: err}));
                }

                res.end();
            }

            res.writeHead(200, contentType);
            res.end(JSON.stringify(deletedChirp));
        });
    }
}

module.exports = processDeleteRequest;