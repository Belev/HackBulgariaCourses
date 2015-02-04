"use strict";

var contactsData = require('../data').contacts;

function errorHandler(err, res, next) {
    res.status(400);
    next(err.message);
}

module.exports = {
    create: function (req, res, next) {
        contactsData.addContact(req.body)
            .then(function (contact) {
                res.json({
                    message: 'Contact successfully created.',
                    contactId: contact.id
                });

                res.locals.contact = contact;
                next();
            }, function (err) {
                errorHandler(err, res, next);
            });
    },
    getAll: function (req, res, next) {
        contactsData.getAll()
            .then(function (contacts) {
                contacts = contacts.map(function (contact) {
                    return {
                        phoneNumber: contact.phoneNumber,
                        personIdentifier: contact.personIdentifier
                    }
                });

                res.json(contacts);
            }, function (err) {
                errorHandler(err, res, next);
            });
    },
    getById: function (req, res, next) {
        contactsData.getById(req.params.id)
            .then(function (contact) {
                res.json({
                    phoneNumber: contact.phoneNumber,
                    personIdentifier: contact.personIdentifier
                });
            }, function (err) {
                errorHandler(err, res, next);
            });
    },
    deleteById: function (req, res, next) {
        contactsData.deleteById(req.params.id)
            .then(function (contact) {
                res.json({
                    message: 'Contact successfully deleted.',
                    contactId: contact.id
                });


            }, function (err) {
                errorHandler(err, res, next);
            });
    }
};