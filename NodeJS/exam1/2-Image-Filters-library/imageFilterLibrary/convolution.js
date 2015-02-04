"use strict";

var q = require('q'),
    kernels = require('../kernels/index');

var convolution = (function () {
    function calculatePixelValue(data, dataRow, dataCol, filter) {
        function isValidPosition(row, col, data) {
            return row >= 0 && col >= 0 && row < data.length && col < data[0].length;
        }

        var row,
            col,
            rowsCount = filter.length,
            colsCount = filter[0].length,
            offset = Math.floor(rowsCount / 2),
            pixelValue = 0;

        var currentDataRow = 0,
            currentDataCol = 0;

        for (row = 0; row < rowsCount; row += 1) {
            currentDataRow = row + dataRow - offset;

            for (col = 0; col < colsCount; col += 1) {
                currentDataCol = col + dataCol - offset;

                if (isValidPosition(currentDataRow, currentDataCol, data)) {
                    pixelValue += data[currentDataRow][currentDataCol] * filter[row][col];
                }
            }
        }

        return pixelValue;
    }

    function calculateConvolutionResult(data, dataRow, dataCol, filter, defer, result) {
        setImmediate(function () {
            if (dataRow === data.length) {
                defer.resolve(result);
                return;
            }

            result[dataRow][dataCol] = calculatePixelValue(data, dataRow, dataCol, filter);

            if (dataCol === data[0].length - 1) {
                calculateConvolutionResult(data, dataRow + 1, 0, filter, defer, result);
            } else {
                calculateConvolutionResult(data, dataRow, dataCol + 1, filter, defer, result);
            }
        });
    }

    function convolve(data, filter) {
        var startRow = 0,
            startCol = 0,
            result = [],
            defer = q.defer();

        data.forEach(function (row) {
            result.push([]);
        });

        calculateConvolutionResult(data, startRow, startCol, filter, defer, result);

        return defer.promise;
    }

    function Convolution() {
        this.edgeDetection = function (imageData) {
            return convolve(imageData, kernels.edgeDetection);
        };

        this.boxBlur = function (imageData) {
            return convolve(imageData, kernels.boxBlur);
        };

        this.applyKernel = function (imageData, kernel) {
            return convolve(imageData, kernel);
        }
    }

    return new Convolution();
})();

module.exports = convolution;