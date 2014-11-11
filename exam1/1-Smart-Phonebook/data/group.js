"use strict";

var q = require('q'),
    async = require('async'),
    utils = require('../utils/utils'),
    Group = require('./models/Group');

var fuzzyHelpers = (function () {
    function findFuzzyGroups(contactId, commonWord) {
        var defer = q.defer();

        Group.find()
            .exec(function (err, allGroups) {
                if (err) {
                    console.log(err);
                    defer.reject(err);
                } else {
                    var fuzzyGroups = allGroups.filter(function (group) {
                        if (group.type === 'normal') {
                            return utils.areWordsReallyClose(group.name, commonWord);
                        } else {
                            return group.name
                                .filter(function (name) {
                                    return utils.areWordsReallyClose(name, commonWord);
                                }).length > 0;
                        }
                    });

                    if (fuzzyGroups.length === 0) {
                        defer.resolve({message: 'No fuzzy groups.'});
                    } else {
                        fuzzyGroups.forEach(function (fuzzyGroup, index) {
                            updateToFuzzyGroup(fuzzyGroup, contactId, commonWord);

                            if (index === fuzzyGroups.length - 1) {
                                defer.resolve({message: 'done'});
                            }
                        });
                    }
                }
            });

        return defer.promise;
    }

    function updateToFuzzyGroup(fuzzyGroup, contactId, commonWord) {
        if (fuzzyGroup.type === 'normal') {
            fuzzyGroup.name = [fuzzyGroup.name];
            fuzzyGroup.type = 'fuzzy';
        }

        fuzzyGroup.contacts.push(contactId);
        fuzzyGroup.name.push(commonWord);
        fuzzyGroup.markModified('name');
        fuzzyGroup.save();
    }

    return {
        findFuzzyGroups: findFuzzyGroups
    }
})();

var normalHelpers = (function () {
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

    return {
        createNewGroup: createNewGroup,
        addContactToExistingGroups: addContactToExistingGroups
    }
})();

var groupData = (function () {
    function findGroup(contactId, commonWord) {
        Group.find()
            .where('name').equals(commonWord)
            .exec(function (err, groups) {
                if (err) {
                    console.log(err);
                } else if (groups.length === 0) {
                    fuzzyHelpers.findFuzzyGroups(contactId, commonWord)
                        .then(function (response) {
                            if (response.message === 'No fuzzy groups.') {
                                normalHelpers.createNewGroup(commonWord, [contactId]);
                            }
                        })
                        .fail(function (err) {
                            console.log(err);
                        });
                } else {
                    normalHelpers.addContactToExistingGroups(groups, contactId);
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