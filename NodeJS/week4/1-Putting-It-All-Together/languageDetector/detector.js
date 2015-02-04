"use strict";

var languages = require('./languages');

var detector = (function () {
    var LANGUAGE_NAME_DEFAULT_VALUE = 'Text';

    function isExtensionExistsForLanguage(extensions, fileExtension) {
        var exists = false;

        extensions.forEach(function (extension) {
            if (extension === fileExtension) {
                exists = true;
                return;
            }
        });

        return exists;
    }

    function getLanguageName(fileName) {
        var lastDotIndex = fileName.lastIndexOf('.');
        var fileExtension = fileName.substring(lastDotIndex);

        var languageName = LANGUAGE_NAME_DEFAULT_VALUE;

        Object.keys(languages)
            .forEach(function (languageKey) {
                var language = languages[languageKey];

                var exists = isExtensionExistsForLanguage(language.extensions, fileExtension);

                if (exists) {
                    languageName = languageKey;
                    return;
                }
            });

        return languageName;
    }

    return {
        getLanguageName: getLanguageName
    }
})();

module.exports = detector;