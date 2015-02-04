"use strict";

var mongoose = require('mongoose');

var snippetSchema = new mongoose.Schema({
    snippetId: String,
    codeLanguage: {type: String, required: true},
    fileName: {type: String, required: true},
    code: {type: String, required: true},
    createdBy: {type: String, required: true}
});

var Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;