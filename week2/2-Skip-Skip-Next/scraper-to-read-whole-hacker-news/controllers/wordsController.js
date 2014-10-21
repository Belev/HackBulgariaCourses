"use strict";

var Word = require('../models/word');

module.exports = {
    keywords: function (req, res, next) {
        var elementPosition = req.query.fromPosition || 0,
            direction = req.query.direction,
            elementsToSkip = parseInt(elementPosition),
            elementsToTake = req.query.fromPosition ? 10 : Number.MAX_VALUE;

        if (direction === 'prev') {
            elementsToSkip = elementsToSkip - 20 > 0 ? elementsToSkip - 20 : 0;
        }

        Word.find()
            .sort('-occurrences')
            .skip(elementsToSkip)
            .limit(elementsToTake)
            .select('text occurrences')
            .exec(function (err, keywords) {
                if (err) {
                    return next(err);
                }

                var wordsWithOccurrences = keywords.map(function (keyword, index) {
                    var objectToReturn = {};
                    objectToReturn.rank = elementsToSkip + index + 1 > 0 ? elementsToSkip + index + 1 : index + 1;
                    objectToReturn.keyword = keyword.text;
                    objectToReturn.count = keyword.occurrences;

                    return objectToReturn
                });

                res.json(wordsWithOccurrences);
            });
    }
};