"use strict";

module.exports = {
    capitaliseFirstLetterAndLowerOthers: function (word) {
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
};