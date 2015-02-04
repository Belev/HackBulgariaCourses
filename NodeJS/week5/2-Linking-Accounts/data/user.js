"use strict";

var User = require('../models/User');

module.exports = {
    createOrUpdate: function (profileName, currentUser, profile, done) {
        var searchOn = {};
        searchOn[profileName + '.id'] = profile.id;

        if (currentUser) {
            User.findOne()
                .where('_id').equals(currentUser._id)
                .exec(function (err, user) {

                });
        } else {
            User.findOne(searchOn, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {

                } else {
                    var newUser = new User();
                    newUser[profileName].id = profile.id;
                    newUser[profileName].name = profile.name;
                }
            });
        }
    }
};