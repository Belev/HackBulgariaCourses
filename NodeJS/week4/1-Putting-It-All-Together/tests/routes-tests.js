"use strict";

require('./config/chai');

var request = require('supertest'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    config = require('./config/config'),
    snippetData = require('../data/snippet'),
    SnippetController = require('../controllers/snippetsController');

require('../config/mongoose')(config, mongoose);
require('../config/express')(app);
require('../config/routes')(app, SnippetController);

request = request(app);

describe('Server routes tests.', function () {
    after(function () {
        mongoose.connection.db.dropDatabase();
    });

    require('./routes-component-tests/post-create-snippet')(request, mongoose);
    require('./routes-component-tests/put-update-snippet')(request, snippetData, mongoose);
    require('./routes-component-tests/delete-delete-snippet')(request, snippetData, mongoose);
    require('./routes-component-tests/get-list-all-snippets')(request, snippetData, mongoose);
    require('./routes-component-tests/get-list-snippet-by-id')(request, snippetData, mongoose);
    require('./routes-component-tests/get-list-snippets-by-creator')(request, snippetData, mongoose);
});