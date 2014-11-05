"use strict";

require('./config/chai');

var snippetData = require('../data/snippet');
var mongoose = require('mongoose');
var config = {
    db: 'mongodb://localhost/snippets-tests'
};

describe('Snippet data tests.', function () {
    before(function () {
        require('../config/mongoose')(config, mongoose);
    });

    after(function () {
        mongoose.connection.db.dropDatabase();
    });

    require('./snippet-data-component-tests/adding-tests')(snippetData, mongoose);
    require('./snippet-data-component-tests/updating-tests')(snippetData, mongoose);
    require('./snippet-data-component-tests/deleting-tests')(snippetData, mongoose);
    require('./snippet-data-component-tests/getting-tests')(snippetData, mongoose);
});


