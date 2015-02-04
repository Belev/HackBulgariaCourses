"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    github: {
        id: String,
        token: String,
        name: String,
        username: String
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;