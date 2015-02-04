"use strict";

var mongoose = require('mongoose');

var wordSchema = mongoose.Schema({
    text: String,
    occurrences: Number,
    itemId: Number
});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;