"use strict";

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    User,// = require('../models/User'),
    Chirp; //= require('../models/Chirp');

module.exports = function (config) {
    mongoose.connect(config.db);
    autoIncrement.initialize(mongoose.connection);

    User = require('../models/User');
    Chirp = require('../models/Chirp');

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
        return;
    });
};