"use strict";

var Article = require('../models/article');
var currentMaxItemId;

module.exports = {
    /**
     * init is used to set the current max item id if there are some articles in the database
     */
    init: function () {
        Article.find()
            .sort('-id')
            .exec(function (err, articles) {
                if (err) {
                    throw err;
                }

                if (articles[0]) {
                    currentMaxItemId = articles[0].id;
                }
            })
    },
    getMaxArticleId: function () {
        return currentMaxItemId;
    },
    setMaxArticleId: function (maxItemId) {
        if (maxItemId > currentMaxItemId) {
            currentMaxItemId = maxItemId;
        }
    },
    saveArticle: function (articleInfo) {
        if (articleInfo.type !== 'story') {
            console.log('We do not support different types than story.');
            return;
        }

        Article.findOne({id: articleInfo.id}, function (err, article) {
            if (err) {
                throw err;
            }

            var newArticle = {
                by: articleInfo.by,
                id: articleInfo.id,
                title: articleInfo.title,
                type: articleInfo.type,
                url: articleInfo.url,
                isRead: false
            };

            if (!article) {
                Article.create(newArticle, function (err, addedArticle) {
                    if (err) {
                        throw err;
                    }

                    console.log(addedArticle.id);
                });
            }
        });
    },
    getAllUnreadArticles: function (callback) {
        Article.find()
            .where('isRead').equals(false)
            .exec(function (err, articles) {
                if (err) {
                    return callback(err);
                }

                callback(null, articles);
            });
    }
};