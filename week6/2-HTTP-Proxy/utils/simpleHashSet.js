"use strict";

var SimpleHashSet = function () {
    this.items = {};

    this.push = function (item) {
        if (!this.items[item]) {
            this.items[item] = true;
        }
    };

    this.hasItem = function (item) {
        return this.items[item];
    };

    this.toString = function () {
        var result = [];

        Object.keys(this.items).forEach(function (itemKey) {
           result.push(itemKey);
        });

        return result.toString();
    };
};

module.exports = SimpleHashSet;