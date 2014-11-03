"use strict";

var uuid = require('node-uuid');
var config = require('../config/githubConfig');
var Graph = require('../../utilities/graph');
var UserSocialGraph = require('../userSocialGraph');

var graphs = {};

module.exports = {
    createGraphFor: function (req, res) {
        try {
            var newSocialGraph = new UserSocialGraph({
                depth: req.body.depth,
                username: req.body.username,
                config: config,
                Graph: Graph
            });

            newSocialGraph.init(function (err) {
                var id = uuid.v4();

                if (err) {
                    res.send({error: err});
                } else {
                    graphs[id] = newSocialGraph;
                    res.send({graphId: id});
                }
            })
        }
        catch (err) {
            res.send({error: err.toString()});
        }
    },
    graphById: function (req, res) {
        var result = '';
        var graph = graphs[req.params.graphId];

        if (graph) {
            result = JSON.parse(graph.getGraphAsString());
        } else {
            result = 'The graph has not been initialized yet';
        }

        res.send({result: result});
    },
    mutuallyFollow: function (req, res) {
        var id = req.params.graphId;
        var username = req.params.username;
        var graph = graphs[id];

        if (!graph) {
            res.send({error: 'Social graph with this id does not exist.'});
            return;
        }

        var isFollowing = graph.isFollowing(username);
        var isUserFollowingMe = graph.isUserFollowingMe(username);
        var relation = '';

        if (isFollowing && isUserFollowingMe) {
            relation = 'mutual';
        } else if (isFollowing) {
            relation = 'first';
        } else if (isUserFollowingMe) {
            relation = 'second';
        } else {
            relation = 'none';
        }

        res.send({relation: relation});
    },
    stepsTo: function (req, res) {
        var id = req.params.graphId;
        var username = req.params.username;
        var graph = graphs[id];

        if (!graph) {
            res.send({error: 'Social graph with this id does not exist.'});
            return;
        }

        var stepsCount = graph.stepsTo(username);
        var result = stepsCount ? stepsCount.toString() : 'There is no such user in the social graph.';

        res.send({result: result});
    }
};