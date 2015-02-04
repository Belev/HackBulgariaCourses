"use strict";

var groupsData = require('../data').groups;

module.exports = {
    addToGroup: function (req, res, next) {
        var contact = res.locals.contact;

        groupsData.addNewContactToGroups(contact)
            .then(function (response) {
                next();
//                console.log(response.message);
            }, function (err) {
                res.status(400);
                next(err.message);
            });
    },
    removeContactFromGroups: function (req, res, next) {
        var contactId = res.locals.id;
        groupsData.removeContactFromGroups(contactId)
            .then(function (response) {
//                console.log(response.message);
            }, function (err) {
                res.status(400);
                next(err.message);
            })
    },
    getAll: function (req, res, next) {
        groupsData.getAll()
            .then(function (groups) {
                res.json(groups);
            }, function (err) {
                res.status(400);
                next(err.message);
            });
    }
};