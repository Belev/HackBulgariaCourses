"use strict";

var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    by: String,
    id: Number,
    title: String,
    type: String,
    url: String,
    isRead: Boolean
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;