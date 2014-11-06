"use strict";

require('./config/chai');

var snippetData = require('../data/snippet');
var mongoose = require('mongoose');
var config = require('./config/config');

describe('Snippet data tests.', function () {
    before(function () {
        require('../config/mongoose')(config, mongoose);
    });

    after(function () {
        mongoose.connection.db.dropDatabase();
    });

    require('./snippet-data-component-tests/adding')(snippetData, mongoose);
    require('./snippet-data-component-tests/updating')(snippetData, mongoose);
    require('./snippet-data-component-tests/deleting')(snippetData, mongoose);
    require('./snippet-data-component-tests/getting')(snippetData, mongoose);
});


