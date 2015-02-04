"use strict";

var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true},
    personIdentifier: {type: String, required: true}
}, {
    strict: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

contactSchema.virtual('commonWords').get(function () {
    return this.personIdentifier.toLowerCase().split(' ');
});

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;