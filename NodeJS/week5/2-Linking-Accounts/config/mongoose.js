"use strict";

var User = require('../models/User');

module.exports = function (config, mongoose) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        console.log('Database up and running...');
    });

    db.on('error', function (err) {
        console.log('Database error: ' + err);
    });
};