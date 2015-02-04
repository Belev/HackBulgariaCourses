"use strict";

var sitemapData = require('../data/sitemap');

var sitemapController = (function () {
    function SitemapController() {
        this.add = function (req, res, next) {
            var url = req.body.url;

            if (!url) {
                return next(new Error('You must provide url to create sitemap.'));
            }

            sitemapData.add(url)
                .then(function (sitemap) {
                    res.json({
                        id: sitemap.id
                    });
                })
                .fail(function (err) {
                    next(err);
                });
        };

        this.findById = function (req, res, next) {
            var id = req.params.id;

            if (!id) {
                return next(new Error('You must provide id to find sitemap.'));
            }

            sitemapData.findById(id)
                .then(function (sitemap) {
                    if (sitemap.status === 'done') {
                        res.json({
                            status: sitemap.status,
                            sitemap: {
                                url: sitemap.url,
                                links: sitemap.links
                            }
                        });
                    } else {
                        res.json({
                            status: sitemap.status
                        });
                    }
                })
                .fail(function (err) {
                    next(err);
                });
        }
    }

    return new SitemapController();
})();

module.exports = sitemapController;