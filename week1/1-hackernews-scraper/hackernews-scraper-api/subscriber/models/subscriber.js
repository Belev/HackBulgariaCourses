"use strict";

var mongoose = require('mongoose');

var subscriberSchema = mongoose.Schema({
    email: String,
    keywords: [String],
    subscriberId: String
});

var Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;