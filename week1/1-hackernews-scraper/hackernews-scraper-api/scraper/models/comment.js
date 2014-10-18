"use strict";

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    by: String,
    id: Number,
    parent: Number,
    type: String,
    text: String,
    isRead: Boolean
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;