"use strict";

var imageFilterLibrary = require('./imageFilterLibrary');

var xMarksTheSpot = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]
    ],
    verticalBlur = [
        [0, 0.5, 0],
        [0, 0, 0],
        [0, 1, 0]
    ];

var rgbImageData = {
    red: xMarksTheSpot,
    green: xMarksTheSpot,
    blue: xMarksTheSpot
};

imageFilterLibrary.monochrome.applyKernel(xMarksTheSpot, verticalBlur).then(function (result) {
    console.log(result);
});

imageFilterLibrary.rgb.applyKernel(rgbImageData, verticalBlur).then(function (result) {
   console.log(result);
});