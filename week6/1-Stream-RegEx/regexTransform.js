"use strict";

var stream = require('stream');
var util = require('util');

function RegexTransform(regex) {
    if (!(regex instanceof  RegExp) && (typeof regex !== 'string')) {
        throw new Error('Invalid regex for regex transform.');
    }

    stream.Transform.call(this, {objectMode: true});
    this.regex = regex instanceof RegExp ? regex : new RegExp(regex);
}
util.inherits(RegexTransform, stream.Transform);

RegexTransform.prototype._transform = function (chunk, encoding, done) {
    var match;

    if (chunk instanceof RegExp) {
        this.regex = chunk;
    } else {
        match = chunk.match(this.regex);

        if (match) {
            this.push(match[0] + '\n');
        }
    }

    done();
};

module.exports = RegexTransform;