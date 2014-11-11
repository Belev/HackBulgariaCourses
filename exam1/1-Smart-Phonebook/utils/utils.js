"use strict";

var Levenshtein = require('levenshtein');

module.exports = {
    capitaliseFirstLetterAndLowerOthers: function (word) {
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    },
    areWordsReallyClose: function (firstWord, secondWord) {
        var distance = new Levenshtein(firstWord, secondWord).distance;
        return distance > 0 && distance <= 2;
    }
};