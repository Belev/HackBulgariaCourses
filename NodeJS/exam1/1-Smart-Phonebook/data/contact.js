"use strict";

var q = require('q'),
    Contact = require('./models/Contact');

module.exports = {
    addContact: function (contactInfo) {
        var defer = q.defer();

        if (contactInfo && contactInfo.phoneNumber && contactInfo.personIdentifier) {
            Contact.create(contactInfo, function (err, contact) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(contact);
                }
            });
        } else if (contactInfo) {
            defer.reject(new Error('You must provide phoneNumber and personIdentifier to create new contact.'));
        } else {
            defer.reject(new Error('You can not create new contact with undefined.'));
        }

        return defer.promise;
    },
    getAll: function () {
        var defer = q.defer();

        Contact.find()
            .exec(function (err, contacts) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(contacts);
                }
            });

        return defer.promise;
    },
    getById: function (contactId) {
        var defer = q.defer();

        if (!contactId) {
            defer.reject(new Error('You must provide id.'));
        } else {
            Contact.findOne()
                .where('_id').equals(contactId)
                .exec(function (err, contact) {
                    if (err) {
                        defer.reject(err);
                    } else if (!contact) {
                        defer.reject(new Error('There is no such contact.'));
                    } else {
                        defer.resolve(contact);
                    }
                });
        }

        return defer.promise;
    },
    deleteById: function (contactId) {
        var defer = q.defer();

        if (!contactId) {
            defer.reject(new Error('You must provide id.'));
        } else {
            Contact.findOneAndRemove()
                .where('_id').equals(contactId)
                .exec(function (err, contact) {
                    if (err) {
                        defer.reject(err);
                    } else if (!contact) {
                        defer.reject(new Error('There is no such contact.'));
                    } else {
                        defer.resolve(contact);
                    }
                });
        }

        return defer.promise;
    }
};