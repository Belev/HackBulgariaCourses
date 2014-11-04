"use strict";

var snippetData = require('../data/snippet');

function handlePromise(promise, res, next) {
    promise.then(function (result) {
        res.json(result);
    }).fail(function (err) {
        next(err);
    })
}

module.exports = {
    createSnippet: function (req, res, next) {
        var addingSnippetPromise = snippetData.addSnipet(req.body);

        handlePromise(addingSnippetPromise, res, next);
    },
    updateSnippet: function (req, res, next) {
        var updatingSnippetPromise = snippetData.updateSnippet(req.body.id, req.body.updateInfo);

        handlePromise(updatingSnippetPromise, res, next);
    },
    deleteSnippet: function (req, res, next) {
        var deletingSnippetPromise = snippetData.deleteSnippet(req.body.id);

        handlePromise(deletingSnippetPromise, res, next);
    },
    listAllSnippets: function (req, res, next) {
        var getAllSnippetsPromise = snippetData.getAllSnippets();

        handlePromise(getAllSnippetsPromise, res, next);
    },
    listSnippetsByCreator: function (req, res, next) {
        var listSnippetsByCreatorPromise = snippetData.findSnippetsByCreator(req.params.creator);

        handlePromise(listSnippetsByCreatorPromise, res, next);
    },
    listSnippetById: function (req, res, next) {
        var listSnippetByIdPromise = snippetData.findSnippetById(req.params.id);

        handlePromise(listSnippetByIdPromise, res, next);
    }
};

//var RouteHandlers = (function () {
//    function handlePromise(promise, res, next) {
//        promise.then(function (result) {
//            res.json(result);
//        }).fail(function (err) {
//            next(err);
//        })
//    }
//
//    function RouteHandlers() {
//    }
//
//    RouteHandlers.prototype = {
//        init: function (data) {
//          this._data = data;
//        },
//        createSnippet: function (req, res, next) {
//            var addingSnippetPromise = this._data.addSnipet(req.body);
//
//            handlePromise(addingSnippetPromise, res, next);
//        },
//        updateSnippet: function (req, res, next) {
//            var updatingSnippetPromise = this._data.updateSnippet(req.body.id, req.body.updateInfo);
//
//            handlePromise(updatingSnippetPromise, res, next);
//        },
//        deleteSnippet: function (req, res, next) {
//            var deletingSnippetPromise = this._data.deleteSnippet(req.body.id);
//
//            handlePromise(deletingSnippetPromise, res, next);
//        },
//        listAllSnippets: function (req, res, next) {
//            var getAllSnippetsPromise = this._data.getAllSnippets();
//
//            handlePromise(getAllSnippetsPromise, res, next);
//        },
//        listSnippetsByCreator: function (req, res, next) {
//            var listSnippetsByCreatorPromise = this._data.findSnippetsByCreator(req.params.creator);
//
//            handlePromise(listSnippetsByCreatorPromise, res, next);
//        },
//        listSnippetById: function (req, res, next) {
//            var listSnippetByIdPromise = this._data.findSnippetById(req.params.id);
//
//            handlePromise(listSnippetByIdPromise, res, next);
//        }
//    };
//
//    return RouteHandlers;
//})();