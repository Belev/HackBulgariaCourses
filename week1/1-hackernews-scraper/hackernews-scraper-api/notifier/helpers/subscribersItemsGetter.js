"use strict";
var hackerNewsRequests = require('../../hacker-news-api-requests/hackerNewsRequests'),
    hackerNewsApiUrl = 'https://hacker-news.firebaseio.com/v0';

module.exports = {
    /**
     * The function filters the articles for every subscriber and checks if the subscriber is interested in such article
     * @param subscribers - all subscribers from database
     * @param items - all unread articles and comments from database
     * @param callback - function to invoke when the last comment is added
     * @returns {{}} - dictionary with every subscriber id and
     *                 as value the subscriber email and all articles and comments for which he/she is looking
     */
    getSubscribersInterestingArticles: function (subscribers, items, callback) {
        var helpers = {
            hasItemAnyKeyword: function (text, keywords) {
                var keywordsAsString = keywords.join('|'),
                    searchForAtLeastOneKeyword = '/' + keywordsAsString + '/gi';

                return text.match(searchForAtLeastOneKeyword) !== null;
            },
            /**
             * The function add new article or comment to the other articles of some subscriber
             * @param subscribersItems - the dictionary in which we store the filtered information
             * @param item - article or comment which will be added to the items for the current subscriber
             * @param subscriber - the subscriber which is interested in some articles
             */
            addItemToSubscriber: function (subscribersItems, item, subscriber) {
                var id = subscriber.subscriberId;

                if (!subscribersItems[id]) {
                    subscribersItems[id] = {};
                    subscribersItems[id].email = subscriber.email;
                    subscribersItems[id].articles = [];
                    subscribersItems[id].comments = [];
                }

                if (item.type === 'story' && subscriber.type.indexOf('story') > -1) {
                    subscribersItems[id].articles.push({
                        url: item.url,
                        title: item.title
                    });
                } else if (item.type === 'comment' && subscriber.type.indexOf('comment') > -1) {
                    hackerNewsRequests.findCommentArticleParent(hackerNewsApiUrl, item.parent, function (err, parentArticle) {
                        if (err) {
                            console.log('Error: ' + err);
                            return;
                        }

                        subscribersItems[id].comments.push({
                            url: parentArticle.url,
                            text: item.text
                        });

                        if (item.isLast) {
                            helpers.markAllItemsAsRead(items);
                            callback(null, subscribersItems);
                        }
                    });
                }
            },
            markAllItemsAsRead: function (items) {
                items.unreadArticles.forEach(function (article) {
                    article.isRead = true;
                    article.save();
                });

                items.unreadComments.forEach(function (comment) {
                    comment.isRead = true;
                    comment.save();
                });
            }
        };

        var subscribersItems = {},
            articles = items.unreadArticles,
            comments = items.unreadComments;

        subscribers.forEach(function (subscriber) {
            var keywords = subscriber.keywords;

            articles.forEach(function (article) {
                if (helpers.hasItemAnyKeyword(article.title, keywords)) {
                    helpers.addItemToSubscriber(subscribersItems, article, subscriber);
                }
            });

            comments.forEach(function (comment, index) {
                if (helpers.hasItemAnyKeyword(comment.text, keywords)) {
                    comment.isLast = index === comments.length - 1;
                    helpers.addItemToSubscriber(subscribersItems, comment, subscriber);
                }
            });
        });
    }
};