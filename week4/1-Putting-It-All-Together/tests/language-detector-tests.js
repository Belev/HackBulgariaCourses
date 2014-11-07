"use strict";

require('./config/chai');

var languageDetector = require('../languageDetector/detector');

describe('Language detector tests.', function () {
    describe('By given valid file name extension should return the language name.', function () {
        it('.cs extension should return C#.', function () {
            var expected = 'C#';
            var fileName = 'test.cs';

            var actual = languageDetector.getLanguageName(fileName);

            expect(actual).to.be.equal(expected);
        });

        it('.js extension should return C#.', function () {
            var expected = 'JavaScript';
            var fileName = 'test.js';

            var actual = languageDetector.getLanguageName(fileName);

            expect(actual).to.be.equal(expected);
        });

        it('.less extension should return C#.', function () {
            var expected = 'Less';
            var fileName = 'test.less';

            var actual = languageDetector.getLanguageName(fileName);

            expect(actual).to.be.equal(expected);
        });
    });

    describe('By given unexisting file name extension should return "Text".', function () {
        it('"invalid-extension" should return "Text".', function () {
            var expected = 'Text';
            var fileName = 'test.invalid-extension';

            var actual = languageDetector.getLanguageName(fileName);

            expect(actual).to.be.equal(expected);
        });
    });
});