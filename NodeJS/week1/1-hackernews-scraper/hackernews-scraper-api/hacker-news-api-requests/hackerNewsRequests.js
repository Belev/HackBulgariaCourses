"use strict";
var https = require('https');

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

function getItemById(hackerNewsApiUrl, itemId, callback) {
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

function findCommentArticleParent(hackerNewsApiUrl, itemId, callback) {
    getItemById(hackerNewsApiUrl, itemId, function processItem(err, item) {
        if (err) {
            return callback(err);
        }

        if (item.type === 'story') {
            return callback(null, item);
        }

        findCommentArticleParent(hackerNewsApiUrl, item.parent, processItem);
    });
}

module.exports = {
    getMaxItemFromApi: getMaxItemFromApi,
    getItemById: getItemById,
    findCommentArticleParent: findCommentArticleParent
};