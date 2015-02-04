"use strict";

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var chirpSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    chirpId: { type: Number, required: true },
    chirpText: { type: String, required: true },
    chirpTime: { type: Date, default: Date.now }
});

chirpSchema.plugin(autoIncrement.plugin, {
    model: 'Chirp',
    field: 'chirpId',
    startAt: 1,
    incrementBy: 1
});

var Chirp = mongoose.model('Chirp', chirpSchema);

module.exports = Chirp;