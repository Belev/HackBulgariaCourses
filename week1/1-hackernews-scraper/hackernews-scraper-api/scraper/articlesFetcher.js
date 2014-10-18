"use strict";

var https = require('https'),
    _ = require('underscore'),
    controllers = require('./controllers/controllers'),
    notify = require('./notifierRequest'),
    hackerNewsApiUrl = 'https://hacker-news.firebaseio.com/v0',
    notifierUrl = 'http://localhost:1515/newArticles',
    interval = 2 * 60 * 1000;

controllers.articleController.init();
controllers.commentController.init();

function getMaxItemFromApi(url, callback) {
    https.get(url, function (res) {
        var maxItemId;

        res.on('data', function (chunk) {
            maxItemId = chunk;
        });

        res.on('end', function () {
            callback(null, parseInt(maxItemId));
        });
    }).on('error', function (err) {
        callback(err);
    });
}

function getItemById(itemId, callback) {
    var getItemUrl = hackerNewsApiUrl + '/item/' + itemId + '.json';

    https.get(getItemUrl, function (res) {
        var item;
        res.on('data', function (chunk) {
            item = chunk;
        });

        res.on('end', function () {
            callback(null, JSON.parse(item));
        });
    }).on('error', function (err) {
        return callback(err);
    });
}

function findStartIndex(currentMaxIndices, maxItemId) {
    var commentMaxId = currentMaxIndices.commentMaxId,
        articleMaxId = currentMaxIndices.articleMaxId,
        maxId = Math.max(commentMaxId, articleMaxId);

    var startIndex = maxId ? maxId : maxItemId;

    if(!maxId) {
        startIndex -= 75;
    }

    if (maxItemId - startIndex > 0) {
        if (maxItemId - startIndex > 100) {
            startIndex = maxItemId - 100;
        }
    }

    return startIndex;
}

/**
 * The function checks if there are articles which we don't have in the database
 * and save every new article to the database if it has type 'story'
 * If there are no articles in the database, take the last 50 from the api and add them to the database
 * If there are and are more than 100, take only 100 articles and add them to the database
 * At the end if we have given the last new article to the callback, notify our notifier to send emails
 * @param {string} url - the hacker news api url for getting article by id
 * @param controllers - article and comment controller which operates all articles and comments
 * @param callback - function which will be executed for every new found article
 */
function checkForNewItems(url, controllers, callback) {
    console.log('Checking for new items...');
    getMaxItemFromApi(url, function (err, maxItemId) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        var currentMaxCommentItemId = controllers.commentController.getMaxCommentId(),
            currentMaxArticleItemId = controllers.articleController.getMaxArticleId(),
            currentMaxIndices = {
                commentMaxId: currentMaxCommentItemId,
                articleMaxId: currentMaxArticleItemId
            };

        var startIndex = findStartIndex(currentMaxIndices, maxItemId);

        if (maxItemId - startIndex > 0) {
            console.log('   Items with id added: ');
            _.range(startIndex + 1, maxItemId + 1).forEach(function (itemId) {
                getItemById(itemId, function (err, item) {
                    item.isLast = (maxItemId === itemId);
                    callback(null, item, controllers);
                });
            });
        } else {
            console.log('There are no new articles.');
        }
    });
}

function processNewItem(err, item, controllers) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    if (item.type === 'story') {
        controllers.articleController.setMaxArticleId(item.id);
        controllers.articleController.saveArticle(item);
    } else if (item.type === 'comment') {
        controllers.commentController.setMaxCommentId(item.id);
        controllers.commentController.saveComment(item);
    }

    if (item.isLast) {
        notify(notifierUrl);
    }
}

module.exports = {
    begin: function () {
        var startCheckingForNewArticles = function () {
            checkForNewItems(hackerNewsApiUrl + '/maxitem.json', controllers, processNewItem);
        };

        startCheckingForNewArticles();

        setInterval(startCheckingForNewArticles, interval);
    }
};