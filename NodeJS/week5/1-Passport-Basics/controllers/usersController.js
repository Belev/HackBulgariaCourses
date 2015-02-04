var encryption = require('../utils/encryption'),
    User = require('../models/User');

module.exports = {
    createUser: function (req, res) {
        if (!req.body.username || !req.body.password) {
            res.render('error', {user: req.user, message: 'Username and password are mandatory to register new user.'});
            return;
        }

        var newUserData = {
            username: req.body.username
        };
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, req.body.password);

        User.create(newUserData, function (err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                res.status(400);
                res.render('error', {user: req.user, message: err.toString()});
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.render('error', {user: req.user, message: err.toString()});
                }

                res.render('index', {user: user});
            });
        });
    }
};