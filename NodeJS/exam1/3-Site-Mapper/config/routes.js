"use strict";

module.exports = function (app, controllers) {
    app.post('/map', controllers.sitemap.add);
    app.get('/sitemap/:id', controllers.sitemap.findById);
};