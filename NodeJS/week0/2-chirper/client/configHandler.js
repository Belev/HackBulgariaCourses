"use strict";

var fs = require('fs');

module.exports = {
    init: function (filePath) {
      this.filePath = filePath;
    },
    loadConfigContent: function (callback) {
        fs.readFile(this.filePath, function (err, data) {
            if (err) {
                return callback(err);
            }

            callback(JSON.parse(data));
        });
    },
    writeConfigContent: function (content, callback) {
        var contentAsJson = JSON.stringify(content, null, 4);

        fs.writeFile(this.filePath, contentAsJson, function (err) {
            if (err) {
                return callback(err);
            }

            callback(null, 'The file was written successfully.');
        })
    }
};