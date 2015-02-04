"use strict";

var q = require('q');
var convolution = require('./convolution');

var rgb = (function () {
    function processFunction(functionName, imageData, kernel) {
        var defer = q.defer();

        convolution[functionName](imageData.red, kernel).then(function (redResult) {
            convolution[functionName](imageData.green, kernel).then(function (greenResult) {
                convolution[functionName](imageData.blue, kernel).then(function (blueResult) {
                    defer.resolve({
                        red: redResult,
                        green: greenResult,
                        blue: blueResult
                    });
                });
            });
        });

        return defer.promise;
    }

    function Rgb() {
        this.edgeDetection = function (imageData) {
            return processFunction('edgeDetection', imageData);
        };

        this.boxBlur = function (imageData) {
            return processFunction('boxBlur', imageData);
        };

        this.applyKernel = function (imageData, kernel) {
            return processFunction('applyKernel', imageData, kernel);
        };
    }

    return new Rgb();
})();

module.exports = rgb;