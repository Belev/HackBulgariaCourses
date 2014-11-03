"use strict";

var q = require('q');
var https = require('https');

var userSocialGraph = (function () {
    function getUserFollowings(username) {
        var id = this._config.clientId;
        var secret = this._config.clientSecret;
        var url = this._config.githubApiUrl
            .replace(/:username/, username)
            .replace(/:client_id/, id)
            .replace(/:client_secret/, secret);

        var defer = q.defer();

        var options = {
            host: 'api.github.com',
            path: url,
            method: 'GET',
            headers: {
                'User-Agent': 'Who-Follows-You-Back'
            }
        };

        https.get(options, function (res) {
            var followingsAsString = '';
            res.on('data', function (chunk) {
                followingsAsString += chunk;
            });

            res.on('end', function () {
                var followings = JSON.parse(followingsAsString);

                defer.resolve(followings);
            });
        }).on('error', function (err) {
            defer.reject(err);
        });

        return defer.promise;
    }

    function builtSocialGraph(users, usersFollowingsCounts, depth, done) {
        console.log('CurrentDepth: ' + depth);

        if (depth === this._depth) {
            done();
        }
        else {
            var currentUser = users.shift();
            var that = this;

            getUserFollowings.call(this, currentUser)
                .then(function (followings) {
                    followings.forEach(function (following) {
                        that._socialGraph.addEdge(currentUser, following.login);
                        users.push(following.login);
                    });

                    if (usersFollowingsCounts.length === 0) {
                        usersFollowingsCounts.push(followings.length);
                    } else {
                        usersFollowingsCounts[1] = usersFollowingsCounts[1] ? usersFollowingsCounts[1] : 0;
                        usersFollowingsCounts[1] += followings.length;
                    }

                    console.log(usersFollowingsCounts);
//                    console.log('to: ' + currentUser);
//                console.log(usersFollowingsCounts[0]);

                    if (usersFollowingsCounts[0] === 0) {
                        usersFollowingsCounts.shift();
                        builtSocialGraph.call(that, users, usersFollowingsCounts, depth + 1, done);
                    } else {
                        usersFollowingsCounts[0]--;
                        builtSocialGraph.call(that, users, usersFollowingsCounts, depth, done);
                    }
                })
                .fail(function (err) {
                    console.log('rejected: ' + err);
                });
        }
    }

    function UserSocialGraph(params) {
        // username, depth, node, graph, config
        if (params.depth === 0 || params.depth >= 4) {
            throw new TypeError('Depth must be between 1 - 3 inclusive.');
        }

        this._username = params.username;
        this._depth = params.depth;
        this._socialGraph = new params.Graph();
        this._config = params.config;
    }

    UserSocialGraph.prototype = {
        init: function (done) {
            builtSocialGraph.call(this, [this._username], [], 0, done)
        },
        following: function () {
            return this._socialGraph.getNeighboursFor(this._username)
                .map(function (neighbour) {
                    return neighbour._value;
                });
        },
        isFollowing: function (username) {
            return this._socialGraph
                .findNode(this._username)
                .hasChild(username);
        },
        isUserFollowingMe: function (username) {
            var node = this._socialGraph.findNode(username);

            if (!node) {
                return false;
            }

            return node.hasChild(this._username);
        },
        stepsTo: function (username) {
            return this._socialGraph.pathBetween(this._username, username, true);
        },
        getGraph: function () {
            return this._socialGraph.toString();
        }
    };

    return UserSocialGraph;
})();

module.exports = userSocialGraph;