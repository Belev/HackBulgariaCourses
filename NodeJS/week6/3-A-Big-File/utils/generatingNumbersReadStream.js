"use strict";

function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function getNext100NumbersAsString() {
    var result = '';
    var i;

    for (i = 0; i < 2500; i += 1) {
        result += getRandomNumber(1, 10);

        if (i !== 2499) {
            result += ', ';
        }
    }

    return result;
}

var stream = require('stream');
var util = require('util');

function MyReadStream(maxSizeAsString) {
    stream.Readable.call(this);

    var toLower = maxSizeAsString.toLowerCase();
    var maxSize = parseInt(toLower.substring(0, toLower.indexOf('b') - 1));

    this.maxSize = toLower.indexOf('g') > -1 ? maxSize * 1024 : maxSize;
    this.currentSize = 0;
}

util.inherits(MyReadStream, stream.Readable);

MyReadStream.prototype._read = function (size, encoding) {
    var that = this;
    setImmediate(function () {
        var nextNumbers = getNext100NumbersAsString();
        that.currentSize += nextNumbers.length;

        var inMb = that.currentSize / (1024 * 1024);
        console.log(inMb + ' MB');


        if (inMb > that.maxSize) {
            console.log('done');
            that.push(null);
        } else {
            that.push(nextNumbers);
        }
    });
};

module.exports = MyReadStream;