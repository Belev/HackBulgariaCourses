"use strict";

var http = require('http'),
    controllers = require('../../scraper/controllers/controllers'),
    subscribersItemsGetter = require('./subscribersItemsGetter');

/**
 * Getting all interesting comments and articles for subscribers who confirmed their subscription
 * The function filters the information, and find those articles for which every subscriber is subscribed
 * After the operation ends invoke the given callback function
 * @param callback - function which will be invoked when the operation ended
 */
module.exports = function getAllArticlesForUsersNotification(callback) {
    http.get('http://localhost:8080/listSubscribers', function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            var subscribers = JSON.parse(data);
            subscribers = subscribers.filter(function (subscriber) {
                return subscriber.hasConfirmed === true;
            });

            controllers.articleController.getAllUnreadArticles(function (err, unreadArticles) {
                if (err) {
                    return callback(err);
                }

                controllers.commentController.getAllUnreadComments(function (err, unreadComments) {
                    if (err) {
                        return callback(err);
                    }

                    var unreadItems = {
                        unreadArticles: unreadArticles,
                        unreadComments: unreadComments
                    };

                    subscribersItemsGetter.getSubscribersInterestingArticles(subscribers, unreadItems, callback);
                });
            });
        });
    }).on('error', function (err) {
        return callback(err);
    });
};