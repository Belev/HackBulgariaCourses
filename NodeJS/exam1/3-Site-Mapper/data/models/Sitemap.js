"use strict";

var mongoose = require('mongoose');

var sitemapSchema = new mongoose.Schema({
    status: {type: String, default: 'currently crawling'},
    url: {type: String, required: true, index: true},
    links: [String]
});

var Sitemap = mongoose.model('Sitemap', sitemapSchema);

module.exports = Sitemap;