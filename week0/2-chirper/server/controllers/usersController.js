"use strict";

var User = require('../models/User'),
    uuid = require('node-uuid');

module.exports = {
    registerUser: function (username, callback) {
        User.findOne({name: username}, function (err, user) {
            if (err) {
                return callback(err);
            }

            if (user) {
                return callback('User with the same username already exists.');
            }

            User.create({
                name: username,
                chirps: 0,
                key: uuid.v4()
            }, function (err, createdUser) {
                if (err) {
                    return callback(err);
                }

                callback(null, {
                    user: createdUser.name,
                    key: createdUser.key
                });
            });
        })
    },
    getAllUsers: function (callback) {
        User.find()
            .select('name userId chirps')
            .exec(function (err, collection) {
                if (err) {
                    return callback(err);
                }

                callback(null, collection);
            });
    }
};