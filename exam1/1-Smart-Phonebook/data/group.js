"use strict";

var q = require('q'),
    async = require('async'),
    utils = require('../utils/utils'),
    Group = require('./models/Group');

var groupData = (function () {
    function createNewGroup(name, contactIds) {
        var newGroup = {
            name: name,
            contacts: contactIds
        };

        Group.create(newGroup, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    function addContactToExistingGroups(groups, contactId) {
        groups.forEach(function (group) {
            group.contacts.push(contactId);
            group.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    function findGroup(contactId, commonWord) {
        Group.find()
            .where('name').equals(commonWord)
            .exec(function (err, groups) {
                if (err) {
                    console.log(err);
                } else if (groups.length === 0) {
                    createNewGroup(commonWord, [contactId]);
                } else {
                    addContactToExistingGroups(groups, contactId);
                }
            });
    }

    function addNewContactToGroups(contact) {
        var defer = q.defer();
        var commonWords = contact.commonWords;
        var calls = [];

        commonWords = commonWords.map(function (commonWord) {
            return utils.capitaliseFirstLetterAndLowerOthers(commonWord);
        });

        commonWords.forEach(function (commonWord) {
            calls.push(function () {
                findGroup(contact.id, commonWord);
            });
        });

        calls.push(function () {
            defer.resolve({message: 'done'});
        });

        async.parallel(calls, function (err) {
            if (err) {
                defer.reject(err);
            }
        });

        return defer.promise;
    }

    function removeContactFromGroups(contactId) {
        var defer = q.defer();

        Group.find()
            .where('contacts').equals(contactId)
            .exec(function (err, groups) {
                if (err) {
                    defer.reject(err);
                } else {
                    groups.forEach(function (group, index) {
                        var contactIndex = group.contacts.indexOf(contactId);

                        group.contacts.splice(contactIndex, 1);
                        group.save();

                        if (index === groups.length - 1) {
                            defer.resolve({message: 'done'});
                        }
                    });
                }
            });

        return defer.promise;
    }

    function getAll() {
        var defer = q.defer();

        Group.find()
            .exec(function (err, groups) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(groups);
                }
            });

        return defer.promise;
    }

    return {
        addNewContactToGroups: addNewContactToGroups,
        removeContactFromGroups: removeContactFromGroups,
        getAll: getAll
    }
})();

module.exports = groupData;