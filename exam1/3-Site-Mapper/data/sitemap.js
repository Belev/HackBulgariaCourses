"use strict";

var q = require('q');
var Sitemap = require('./models/Sitemap');

var sitemapData = (function () {
    var NO_SUCH_SITEMAP = 'There is no such sitemap.';

    function handleCallbackResult(err, result, defer) {
        if (err) {
            defer.reject(err);
        } else if (!result) {
            defer.reject(NO_SUCH_SITEMAP);
        } else {
            defer.resolve(result);
        }
    }

    function SitemapData() {
        this.add = function (url, links) {
            var defer = q.defer();

            this._findByUrl(url)
                .then(function (sitemap) {
                    defer.resolve(sitemap);
                })
                .fail(function (err) {
                    if (err === NO_SUCH_SITEMAP) {
                        Sitemap.create({
                            url: url,
                            links: links || []
                        }, function (err, sitemap) {
                            handleCallbackResult(err, sitemap, defer);
                        });
                    } else {
                        defer.reject(err);
                    }
                });

            return defer.promise;
        };

        this._findByUrl = function (url) {
            var defer = q.defer();

            Sitemap.findOne()
                .where('url').equals(url)
                .exec(function (err, sitemap) {
                    handleCallbackResult(err, sitemap, defer);
                });

            return defer.promise;
        };

        this.findById = function (id) {
            var defer = q.defer();

            Sitemap.findOne()
                .where('_id').equals(id)
                .exec(function (err, sitemap) {
                    handleCallbackResult(err, sitemap, defer);
                });

            return defer.promise;
        };

        this.findByStatus = function (status) {
            var defer = q.defer();

            Sitemap.findOne()
                .where('status').equals(status)
                .exec(function (err, sitemap) {
                    handleCallbackResult(err, sitemap, defer);
                });

            return defer.promise;
        }
    }

    return new SitemapData();
})();

module.exports = sitemapData;