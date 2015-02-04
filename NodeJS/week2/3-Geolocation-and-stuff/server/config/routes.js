"use strict";
var locationController = require('../controllers/locationController');

module.exports = function (app) {
    app.get('/locations', locationController.findLocations);
    app.post('/locations', locationController.saveLocation);
};