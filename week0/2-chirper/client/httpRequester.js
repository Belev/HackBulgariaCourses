"use strict";

var http = require('http'),
    request = require('request'),
    actions = {
        register: function (args, callback) {
            var user = {
                username: args.user
            };

            request({url: args['api_url'] + '/register', method: 'POST', json: true, body: user }, function (err, res, body) {
                if(err) {
                    return callback(err);
                }

                callback(null, body);
            });
        },
        getAllChirps: function (args, callback) {
            http.get(args['api_url'] + '/all_chirps', function (res) {
                var result = '';

                res.on('data', function (chunk) {
                    result += chunk.toString();
                });

                res.on('end', function () {
                    callback(null, result);
                });
            }).on('error', function (err) {
                return callback(err);
            });

        },
        myChirps: function (args, callback) {
            var query = '?user=' + args.user + '&key=' + args.key;
            http.get(args['api_url'] + '/my_chirps' + query, function (res) {
                var result = '';

                res.on('data', function (chunk) {
                    result += chunk.toString();
                });

                res.on('end', function () {
                    callback(null, result);
                });
            }).on('error', function (err) {
                return callback(err);
            });

        },
        createChirp: function (args, callback) {
            var chirp = {
                'chirpText': args.message,
                'username': args.user,
                'key': args.key
            };

            request({ uri: args['api_url'] + '/chirp',
                method: 'POST',
                body: JSON.stringify(chirp)
            }, function (err, res, body) {
                if (!err && res.statusCode == 200) {
                    callback(null, JSON.parse(body));
                } else {
                    callback(err);
                }
            });
        },
        deleteChirp: function (args, callback) {
            var query = '?key=' + args.key + '&chirpId=' + args.chirpId;

            request({ uri: args['api_url'] + '/chirp' + query,
                method: 'DELETE'
            }, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    callback(JSON.parse(body));
                } else {
                    callback(err);
                }
            });
        }
    };

module.exports = {
    request: function (action, args, callback) {
        var handler = actions[action];
        if (!handler) {
            console.log('Invalid action');
        }
        return handler(args, callback);
    }
};