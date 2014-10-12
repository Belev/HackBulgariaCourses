"use strict";

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var userSchema = mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: Number, required: true },
    chirps: { type: Number, required: true },
    key: { type: String, required: true }
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});

var User = mongoose.model('User', userSchema);

module.exports = User;