"use strict";

var argParser = require('.utils/argumentParser');
var fs = require('fs');
var writeStream = fs.createWriteStream('./' + argParser.output + '.txt');
var generatingNumbersReadStream = require('./utils/generatingNumbersReadStream');

var generator = new generatingNumbersReadStream(argParser.size);

generator.pipe(writeStream);