"use strict";

var https = require('https'),
    _ = require('underscore'),
    ArticleController = require('./controllers/articleController'),
    notify = require('./notifierRequest'),
    hackerNewsApiUrl = 'https://hacker-news.firebaseio.com/v0',
    notifierUrl = 'http://localhost:1515/newArticles',
    interval = 2 * 60 * 1000;

ArticleController.init();

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

function getArticleById(articleId, callback) {
    var getArticleUrl = hackerNewsApiUrl + '/item/' + articleId + '.json';

    https.get(getArticleUrl, function (res) {
        var article;
        res.on('data', function (chunk) {
            article = chunk;
        });

        res.on('end', function () {
            callback(null, JSON.parse(article));
        });
    }).on('error', function (err) {
        return callback(err);
    });
}

/**
 * The function checks if there are articles which we don't have in the database
 * and save every new article to the database if it has type 'story'
 * If there are no articles in the database, take the last 50 from the api and add them to the database
 * If there are and are more than 100, take only 100 articles and add them to the database
 * At the end if we have given the last new article to the callback, notify our notifier to send emails
 * @param {string} url - the hacker news api url for getting article by id
 * @param articlesController - controller which operates all articles
 * @param callback - function which will be executed for every new found article
 */
function checkForNewArticles(url, articlesController, callback) {
    console.log('Checking for new articles...');
    getMaxItemFromApi(url, function (err, maxItemId) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        var currentMaxItemId = articlesController.getMaxArticleId(),
            startIndex = currentMaxItemId ? currentMaxItemId : maxItemId;

        console.log('Current max item ID: ' + currentMaxItemId);

        if (!currentMaxItemId) {
            startIndex -= 50;
        }

        if (maxItemId - startIndex > 0) {
            if (maxItemId - startIndex > 100) {
                startIndex = maxItemId - 100;
            }

            console.log('   Articles with id added: ');
            _.range(startIndex + 1, maxItemId + 1).forEach(function (itemId) {
                getArticleById(itemId, function (err, article) {
                    article.isLast = (maxItemId === itemId);
                    callback(null, article, articlesController);
                });
            });
        } else {
            console.log('There are no new articles.');
        }
    });
}

function processNewArticle(err, result, articlesController) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    if (result.type === 'story') {
        articlesController.setMaxArticleId(result.id);
        articlesController.saveArticle(result);
    }

    if (result.isLast) {
        notify(notifierUrl);
    }
}

module.exports = {
    begin: function () {
        var startCheckingForNewArticles = function () {
            checkForNewArticles(hackerNewsApiUrl + '/maxitem.json', ArticleController, processNewArticle);
        };

        startCheckingForNewArticles();

        setInterval(startCheckingForNewArticles, interval);
    }
};