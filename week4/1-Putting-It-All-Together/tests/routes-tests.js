"use strict";

require('./config/chai');

var request = require('supertest'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    config = {
        port: 1470,
        db: 'mongodb://localhost/snippets-tests'
    },
    snippetData = require('../data/snippet'),
    SnippetController = require('../controllers/snippetsController');


require('../config/mongoose')(config, mongoose);
require('../config/express')(app);
require('../config/routes')(app, SnippetController);

//app.listen(config.port);
console.log('Server listenning on port: ' + config.port);

request = request(app);

describe('Server routes tests.', function () {
//    var addedSnippet;
//
//    beforeEach(function (done) {
//        snippetData.addSnipet({
//            codeLanguage: 'test',
//            createdBy: 'me',
//            fileName: 'test',
//            code: 'code'
//        }).then(function (snippet) {
//            addedSnippet = snippet;
//            done();
//        });
//    });

    after(function () {
        mongoose.connection.db.dropDatabase();
    });

    require('./routes-component-tests/post-create-snippet')(request);
    require('./routes-component-tests/put-update-snippet')(request, snippetData);
    require('./routes-component-tests/delete-delete-snippet')(request, snippetData);
    require('./routes-component-tests/get-list-all-snippets')(request, snippetData);
});