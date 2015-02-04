"use strict";

var Socket = require('net').Socket;
var ImageDataTransformStream = require('./consumerUtils/imageDataTransform');
var ImagePngWriterStream = require('./consumerUtils/imagePngWriter');

var imageDataTransformStream = new ImageDataTransformStream();
var imagePngWriterStream = new ImagePngWriterStream('result.png');

var socket = new Socket();
socket.connect(3000);

socket.pipe(imageDataTransformStream)
    .pipe(imagePngWriterStream);