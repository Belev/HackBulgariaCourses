"use strict";
var utils = (function () {
    var fs = require('fs'),
        os = require('os');

    function isValidUrl(url, validUrlStarts, validUrlEndings) {
        if (isUrlStartValid(url, validUrlStarts)) {
            return isUrlEndingValid(url, validUrlEndings);
        } else {
            return false;
        }

        function isUrlStartValid(url, validUrlStarts) {
            var isValidStart = false;

            validUrlStarts.forEach(function (urlStart) {
                if (url.indexOf(urlStart) > -1) {
                    isValidStart = true;
                }
            });

            return isValidStart;
        }

        function isUrlEndingValid(url, validUrlEndings) {
            var isValidEnd = false;

            validUrlEndings.forEach(function (urlStart) {
                if (url.indexOf(urlStart) > -1) {
                    isValidEnd = true;
                }
            });

            return isValidEnd;
        }
    }

    function createJsonConfigFileContent(data) {
        var dataAsString = data.toString()
            .replace(/ /g, '')
            .replace(/^\s*\n/gm, '');

        if (dataAsString[dataAsString.length - 1] == os.EOL) {
            dataAsString = dataAsString.substr(0, dataAsString.length - 1);
        }

        var dataLines = dataAsString.split(os.EOL),
            dataAsObject = {},
            usedObjectName = '';

        dataLines.forEach(function (line) {
            if (line[0] === ';') {
                return;
            }

            if (line[0] === '[') {
                usedObjectName = line.substr(1, line.length - 2);
                dataAsObject[usedObjectName] = {};
                return;
            }

            var splittedLine = line.split('=');

            dataAsObject[usedObjectName][splittedLine[0]] = splittedLine[1];
        });
        return dataAsObject;
    }

    function createIniConfigFileContent(data) {
        var dataAsObjects = JSON.parse(data.toString());
        var iniFileContent = '';

        for (var key in dataAsObjects) {
            iniFileContent += '[' + key + ']' + os.EOL;

            var value = dataAsObjects[key];

            for (var valueKey in value) {
                iniFileContent += valueKey + '=' + value[valueKey] + os.EOL;
            }
        }

        iniFileContent = iniFileContent.substr(0, iniFileContent.length - 1);
        return iniFileContent;
    }

    function writeFile(fileName, fileType, content) {
        if (fileType === 'json') {
            content = JSON.stringify(content, null, 4);
        }

        fs.writeFile('./' + fileName + '.' + fileType, content, function (err) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('File was written successfully. Look in your directory.');
        });
    }

    return {
        isValidUrl: isValidUrl,
        createJsonConfigFileContent: createJsonConfigFileContent,
        createIniConfigFileContent: createIniConfigFileContent,
        writeFile: writeFile
    }
})();

module.exports = utils;