"use strict";

var passport = require('passport');

module.exports = {
    login: function (req, res, next) {
        if (!req.body.username || !req.body.password) {
            res.render('error', {user: req.user, message: 'Fill username and password fields.'});
            return;
        }

        var authenticate = passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                res.render('error', {user: req.user, message: 'Invalid username or password.'});
            }

            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }

                res.render('index', {user: user});
            });
        });

        authenticate(req, res, next);
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },
    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403);
            res.end();
        }
        else {
            next();
        }
    }
};