"use strict";

var WordsController = require('../controllers/wordsController');

module.exports = function (app) {
    app.get('/keywords', WordsController.keywords);

    app.get('*', function (req, res) {
        res.send('Hi. You can only view the current result of scraping HackerNews. Go to /keywords');
    });
};