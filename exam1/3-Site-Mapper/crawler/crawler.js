"use strict";

var q = require('q');
var SimpleCrawler = require("simplecrawler");

// TODO: implement crawler
var Crawler = function (url) {
    this.crawler = new SimpleCrawler(url);

    this.startCrawling = function () {

    }
};