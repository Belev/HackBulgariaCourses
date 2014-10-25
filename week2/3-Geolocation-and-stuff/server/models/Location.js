"use strict";

var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    tags: [String],
    geometry: {
        type: {type: String, required: true, default: 'Point'},
        coordinates: {type: [Number], required: true, index: '2dsphere'}
    }
});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;