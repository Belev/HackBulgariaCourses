"use strict";

var http = require('http'),
    ArticlesController = require('../../scraper/controllers/articleController'),
    subscribersArticlesGetter = require('./subscribersArticlesGetter');

/**
 * Getting all subscribers and articles
 * The function filters the information, and find those articles for which every subscriber is subscribed
 * After the operation ends invoke the given callback function
 * @param callback
 */
module.exports = function getAllArticlesForUsersNotification(callback) {
    http.get('http://localhost:8080/listSubscribers', function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            var subscribers = JSON.parse(data);

            ArticlesController.getAllUnreadArticles(function (err, unreadArticles) {
                if (err) {
                    return callback(err);
                }

                var subscribersArticles = subscribersArticlesGetter.getSubscribersInterestingArticles(subscribers, unreadArticles);
                callback(null, subscribersArticles);
            });
        });
    }).on('error', function (err) {
        return callback(err);
    });
};