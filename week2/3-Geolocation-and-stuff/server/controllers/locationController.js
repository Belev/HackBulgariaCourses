"use strict";

var Location = require('../models/Location');

module.exports = {
    saveLocation: function (req, res, next) {
        var newLocationData = req.body;

        console.log(newLocationData);

        var newLocationToSave = {
            name: newLocationData.name,
            tags: newLocationData.tags,
            geometry: {
                coordinates: [newLocationData.position.lng, newLocationData.position.lat]
            }
        };

        Location.create(newLocationToSave, function (err, newLocation) {
            if (err) {
                return next(err);
            }

            res.json(newLocation);
        });
    },
    findLocations: function (req, res, next) {
        var searchInfo = JSON.parse(req.header('x-search-info'));

        var nearOptions = {
            center: [parseFloat(searchInfo.position.lng), parseFloat(searchInfo.position.lat)],
            maxDistance: parseFloat(searchInfo.range),
            spherical: true
        };

        Location.find()
            .where('geometry.coordinates')
            .near(nearOptions)
            .where('tags').all(searchInfo.tags)
            .exec(function (err, locationsInRange) {
                if (err) {
                    return next(err);
                }


                var locations = locationsInRange.map(function (location) {
                    return {
                        name: location.name,
                        coordinates: location.geometry.coordinates
                    }
                });

                console.log(locations);

                res.json(locations);
            });
    }
};