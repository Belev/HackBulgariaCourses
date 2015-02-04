"use strict";

var fs = require('fs');
var bigInt = require('big-integer');
var numbersReadStream = fs.createReadStream('./numbers.txt');

var sum = bigInt(0, 10);
var currentSize = 0;

function processChunkNumbers(chunkNumbers) {
    var splitted = chunkNumbers.split(',').join('').split(' ');

    var numbers = splitted.map(function (numberAsStr) {
        return parseInt(numberAsStr);
    });

    numbers.forEach(function (number) {
        sum += number;
    });
}

var chunkNumbersAsString = '';

numbersReadStream.on('data', function (chunkNumbers) {
    var asString = chunkNumbers.toString();

    if (asString[asString.length - 1] === ',' || asString[asString.length - 1] === ' ') {
        processChunkNumbers(chunkNumbersAsString);
        chunkNumbersAsString = '';
    } else {
        chunkNumbersAsString += asString;
    }

    currentSize += chunkNumbers.toString().length / (1024 * 1024);
    console.log(currentSize + ' MB');
});

numbersReadStream.on('end', function () {
    console.log('Sum: ' + sum);
});