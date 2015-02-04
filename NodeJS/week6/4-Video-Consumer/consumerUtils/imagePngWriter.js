"use strict";

var util = require('util');
var Writable = require('stream').Writable;
var fs = require('fs');
var PNG = require('pngjs').PNG;

function ImagePngWriterStream(fileName) {
    Writable.call(this, {objectMode: true});
    this.fileName = fileName;
}
util.inherits(ImagePngWriterStream, Writable);

ImagePngWriterStream.prototype.createImage = function (image) {
    var png = new PNG({
        width: image.width,
        height: image.height
    });

    var size = image.width * image.height;

    for (var i = 0; i < size; i++) {
        png.data[i * 4 + 0] = image.contentBuffer[i * 3 + 0];
        png.data[i * 4 + 1] = image.contentBuffer[i * 3 + 1];
        png.data[i * 4 + 2] = image.contentBuffer[i * 3 + 2];
        png.data[i * 4 + 3] = 255;
    }

    png.pack().pipe(fs.createWriteStream(this.fileName));
};

ImagePngWriterStream.prototype._write = function (imageBuffer, encoding, callback) {
    if (imageBuffer) {
        this.createImage(imageBuffer);
        callback();
    } else {
        this.push(null);
    }
};

module.exports = ImagePngWriterStream;