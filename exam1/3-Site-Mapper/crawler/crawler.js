"use strict";

var q = require('q');
var robots = require('robots');
var request = require('request');
var parser = new robots.RobotsParser();
var cheerio = require('cheerio');
var url = require('url');
var sleep = require('sleep');
var sitemap = require('../data/sitemap');

var mongoose = require('mongoose'),
    config = require('../config/config')['development'];

require('../config/mongoose')(config, mongoose);

var crawler = (function (sitemapData) {
    function getBaseUrl(userUrl) {
        var parsed = url.parse(userUrl);
        return userUrl.replace(parsed.path, '');
    }

    function addLinkMissingParts(userUrl, givenUrl) {
        var hasProtocol = url.parse(givenUrl).protocol || false;

        return hasProtocol ? givenUrl : userUrl.slice(0, userUrl.length - 1) + givenUrl;
    }

    function isFromSameHost(userUrl, currentUrl) {
        var hostname = url.parse(userUrl).hostname;
        return currentUrl.indexOf(hostname) > -1;
    }

    function getUrlHtml(userUrl) {
        var defer = q.defer();
        var urlForParser = getBaseUrl(userUrl) + '/robots.txt';

        parser.setUrl(urlForParser, function (parser, success) {
            if (success) {
                parser.canFetch('*', userUrl, function (access) {
                    if (access) {
                        request({uri: userUrl}, function (err, res, body) {
                            defer.resolve({
                                userUrl: userUrl,
                                html: body
                            });
                        });
                    } else {
                        defer.reject('No access.');
                    }
                });
            } else {
                defer.reject('No robots file.');
            }
        });

        return defer.promise;
    }

    function getLinksFromHtml(response) {
        var defer = q.defer();
        var links = [];
        var cheerioHtml = cheerio.load(response.html);

        cheerioHtml('a').map(function (index, link) {
            var linkHref = cheerio(link).attr('href');

            if (linkHref) {
                linkHref = addLinkMissingParts(response.userUrl, linkHref);

                if (isFromSameHost(response.userUrl, linkHref)) {
                    links.push(linkHref);
                }
            }
        });

        defer.resolve(links);

        return defer.promise;
    }

    function crawl(getLinks, linksForSitemap, done) {
        var currentLink = getLinks.shift();
        if (linksForSitemap.length > 500) {
            done(linksForSitemap.slice(0, 500));
        } else {
            setImmediate(function () {
                getUrlHtml(currentLink)
                    .then(getLinksFromHtml)
                    .then(function (links) {
                        crawl(getLinks.concat(links), linksForSitemap.concat(links), done);
                    });
            });
        }
    }

    function start() {
        sitemapData.findByStatus('currently crawling')
            .then(function (sitemap) {
                console.log(sitemap);
                crawl([sitemap.url], [], function (links) {
                    links.forEach(function (link) {
                        sitemap.links.push(link);
                    });
                    sitemap.status = 'done';

                    sitemap.save(function (err) {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        sleep.sleep(5);
                        setImmediate(function () {
                            start();
                        });
                    });
                });
            })
            .fail(function (err) {
                if (err === 'There is no such sitemap.') {
                    console.log('No pending sitemaps.');
                    sleep.sleep(15);
                    setImmediate(function () {
                        start();
                    });
                }
            });
    }

    return {
        start: start
    }
})(sitemap);

crawler.start();