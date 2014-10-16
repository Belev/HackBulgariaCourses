"use strict";

var NotifierController = require('../controllers/notifierController');

module.exports = function (app) {
    app.get('/', NotifierController.sendHelloMessage);
    app.post('/newArticles', NotifierController.notifySubscribedUsers);
};