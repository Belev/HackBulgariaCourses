"use strict";

var convolution = require('./convolution');

var monochrome = (function () {
    function Monochrome() {
        this.edgeDetection = function (imageData) {
            return convolution.edgeDetection(imageData);
        };

        this.boxBlur = function (imageData) {
            return convolution.boxBlur(imageData);
        };

        this.applyKernel = function (imageData, kernel) {
            return convolution.applyKernel(imageData, kernel);
        };
    }

    return new Monochrome();
})();

module.exports = monochrome;