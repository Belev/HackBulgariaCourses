"use strict";

var authConfig = require('./authConfig'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    GithubStrategy = require('passport-github').Strategy;

module.exports = function () {
    passport.use(new FacebookStrategy({
        clientID        : authConfig.facebook.clientID,
        clientSecret    : authConfig.facebook.clientSecret,
        callbackURL     : authConfig.facebook.callbackURL,
        passReqToCallback : true
    }, function (req, token, refreshToken, profile, done) {
        process.nextTick(function () {
           // process facebook profile info
        });
    }));

    passport.use(new TwitterStrategy({
        consumerKey     : authConfig.twitter.consumerKey,
        consumerSecret  : authConfig.twitter.consumerSecret,
        callbackURL     : authConfig.twitter.callbackURL,
        passReqToCallback : true
    }, function (req, token, tokenSecret, profile, done) {
        process.nextTick(function () {
           // process twitter profile info
        });
    }));

    passport.use(new GithubStrategy({
        clientID: authConfig.github.clientId,
        clientSecret: authConfig.github.clientSecret,
        callbackURL: authConfig.github.callbackUrl
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            // process github profile info
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