"use strict";

var passport = require('passport'),
    LocalPassport = require('passport-local'),
    User = require('../models/User');

module.exports = function () {
    passport.use(new LocalPassport(function (username, password, done) {
        User.findOne()
            .where('username').equals(username)
            .exec(function (err, user) {
                if (err) {
                    return done('Error loading user: ' + err);
                }

                if (user && user.authenticate(password)) {
                    return done(null, user);
                }
                else {
                    return done(null, false, {message: 'Incorrect username or password.'});
                }
            });
    }));

    passport.serializeUser(function (user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne()
            .where('_id').equals(id)
            .exec(function (err, user) {
            if (err) {
                return done('Error loading user: ' + err);
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    })
};