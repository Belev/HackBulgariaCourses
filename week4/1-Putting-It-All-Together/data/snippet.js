"use strict";

var uuid = require('node-uuid');
var q = require('q');
var Snippet = require('./models/Snippet');

module.exports = {
    addSnipet: function (snippetInfo) {
        var defer = q.defer();

        snippetInfo['snippetId'] = uuid.v4();
        Snippet.create(snippetInfo, function (err, snippet) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(snippet);
            }
        });

        return defer.promise;
    },
    updateSnippet: function (snippetId, newSnippetInfo) {
        var defer = q.defer();

        if (!newSnippetInfo) {
            defer.reject('You must provide updateInfo to update snippet.');
        } else {
            this.findSnippetById(snippetId)
                .then(function (snippet) {
                    if (newSnippetInfo.codeLanguage) {
                        snippet.codeLanguage = newSnippetInfo.codeLanguage;
                    }

                    if (newSnippetInfo.fileName) {
                        snippet.fileName = newSnippetInfo.fileName;
                    }

                    if (newSnippetInfo.code) {
                        snippet.code = newSnippetInfo.code;
                    }

                    if (newSnippetInfo.createdBy) {
                        snippet.createdBy = newSnippetInfo.createdBy;
                    }

                    snippet.save();
                    defer.resolve(snippet);
                }).fail(function (err) {
                    defer.reject(err);
                });
        }

        return defer.promise;
    },
    deleteSnippet: function (snippetId) {
        var defer = q.defer();

        this.findSnippetById(snippetId)
            .then(function (snippet) {
                var snippetInfo = {
                    snippetId: snippet.snippetId,
                    codeLanguage: snippet.codeLanguage,
                    fileName: snippet.fileName,
                    code: snippet.code,
                    createdBy: snippet.createdBy
                };

                snippet.remove();
                defer.resolve(snippetInfo);
            }).fail(function (err) {
                defer.reject(err);
            });

        return defer.promise;
    },
    getAllSnippets: function () {
        var defer = q.defer();

        Snippet.find()
            .exec(function (err, allSnippets) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(allSnippets);
                }
            });

        return defer.promise;
    },
    findSnippetsByCreator: function (creatorName) {
        var defer = q.defer();

        if (!creatorName) {
            defer.reject('You must provide creatorName to search snippets.');
        } else {
            Snippet.find()
                .where('createdBy').equals(creatorName)
                .exec(function (err, snippets) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(snippets);
                    }
                });
        }

        return defer.promise;
    },
    findSnippetById: function (snippetId) {
        var defer = q.defer();

        if (!snippetId) {
            defer.reject('You must provide id.');
        } else {
            Snippet.findOne()
                .where('snippetId').equals(snippetId)
                .exec(function (err, snippet) {
                    if (err) {
                        defer.reject(err);
                    } else if (!snippet) {
                        defer.reject('There is no such snippet in the database.');
                    } else {
                        defer.resolve(snippet);
                    }
                });
        }

        return defer.promise;
    }
};