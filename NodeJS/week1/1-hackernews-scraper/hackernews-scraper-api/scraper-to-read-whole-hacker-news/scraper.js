"use strict";

var _ = require('underscore'),
    https = require('https'),
    natural = require('natural'),
    tokenizer = new natural.WordTokenizer(),
    itemUrl = 'https://hacker-news.firebaseio.com/v0/item/:id.json',
    interval = 10000;

var config = require('./config/config')['development'];
require('./config/mongoose')(config);

var WordsController = require('./controllers/scraperWordsController');
var beginFetchingItems = (function () {
    function getFifteenNewItems() {
        var lastId = WordsController.getLastWordId();
        console.log(lastId);

        _.range(lastId + 1, lastId + 16)
            .forEach(function (itemId) {
                var url = itemUrl.replace(/:id/g, itemId);

                https.get(url, function (res) {
                    var data = '';

                    res.on('data', function (chunk) {
                        data += chunk;
                    });

                    res.on('end', function () {
                        data = JSON.parse(data);
                        var text = data.title || data.text || '';
                        var words = tokenizer.tokenize(text);

                        WordsController.setLastWordId(itemId);
                        WordsController.saveWords(words, itemId);
                    });
                });
            });
    }

    function beginFetchingItems(interval) {
        getFifteenNewItems();

        setInterval(getFifteenNewItems, interval);
    }

    return beginFetchingItems;
})();

WordsController.init()
    .then(function () {
        beginFetchingItems(interval);
    });