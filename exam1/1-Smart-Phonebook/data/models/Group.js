"use strict";

var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.Mixed, required: true, index: true},
    contacts: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true, index: true}
    ],
    type: {type: String, default: 'normal'}
}, {
    strict: true
});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;