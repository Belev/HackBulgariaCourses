"use strict";

module.exports = function (app, controllers) {
    app.get('/', controllers.main.renderIndex);
};