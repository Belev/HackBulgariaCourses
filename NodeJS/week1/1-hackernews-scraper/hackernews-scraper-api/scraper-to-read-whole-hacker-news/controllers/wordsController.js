"use strict";

var Word = require('../models/word');

module.exports = {
    keywords: function (req, res, next) {
        Word.find()
            .sort('-occurrences')
            .select('text occurrences')
            .exec(function (err, keywords) {
                if (err) {
                    return next(err);
                }

                var wordsWithOccurrences = keywords.map(function (keyword) {
                    var objectToReturn = {};
                    objectToReturn[keyword.text] = keyword.occurrences;

                    return objectToReturn
                });

                var output = JSON.stringify(wordsWithOccurrences);
                output = output.replace(/,/g, ',<br>');

                res.send(output);
            });
    }
};