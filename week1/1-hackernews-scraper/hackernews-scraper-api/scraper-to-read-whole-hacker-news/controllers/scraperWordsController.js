"use strict";
var Word = require('../models/word'),
    q = require('q'),
    lastAddedWordId;

module.exports = {
    init: function () {
        var defer = q.defer();
        Word.find()
            .sort('-itemId')
            .exec(function (err, keywords) {
                if (err) {
                    defer.reject(err);
                }

                console.log('Words controller is initialized.');
                if (keywords[0]) {
                    lastAddedWordId = keywords[0].itemId;
                } else {
                    lastAddedWordId = 0;
                }

                defer.resolve(lastAddedWordId);
            });

        return defer.promise;
    },
    getLastWordId: function () {
        return lastAddedWordId;
    },
    setLastWordId: function (id) {
        if (lastAddedWordId < id) {
            lastAddedWordId = id;
        }
    },
    saveWords: function (words, itemId) {
        words.forEach(function (text) {
            Word.findOne()
                .where('text').equals(text)
                .exec(function (err, word) {
                    if (err) {
                        console.log('Error: ' + err);
                        return;
                    }

                    if (!word) {
                        Word.create({
                            text: text,
                            occurrences: 1,
                            itemId: itemId
                        });
                    } else {
                        word.occurrences += 1;
                        word.save();
                    }
                });
        });
    }
};