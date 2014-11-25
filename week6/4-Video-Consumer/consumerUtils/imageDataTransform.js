"use strict";

var util = require('util');
var Transform = require('stream').Transform;

function ImageDataTransformStream() {
    Transform.call(this);
    this.hasStarted = false;
    this.imageDataBuffer = new Buffer(0);
    this._readableState.objectMode = true;
    this._writableState.objectMode = false;
}
util.inherits(ImageDataTransformStream, Transform);

ImageDataTransformStream.prototype.processImageChunk = function () {
    if (this.imageDataBuffer.length < 4) {
        return;
    }

    var width = this.imageDataBuffer.readUInt16BE(0);
    var height = this.imageDataBuffer.readUInt16BE(2);

    var requiredLength = width * height * 3 + 4;

    if (this.imageDataBuffer.length >= requiredLength) {
        var contentBuffer = this.imageDataBuffer.slice(5, requiredLength + 1);
        this.imageDataBuffer = this.imageDataBuffer.slice(requiredLength + 2);

        this.push({
            width: width,
            height: height,
            contentBuffer: contentBuffer
        });
    }
};

ImageDataTransformStream.prototype._transform = function (imageChunkBuffer, encoding, done) {
    if (imageChunkBuffer) {
        this.imageDataBuffer = Buffer.concat([this.imageDataBuffer, imageChunkBuffer]);
        this.processImageChunk();
        done();
    } else {
        this.processImageChunk();
    }
};

module.exports = ImageDataTransformStream;