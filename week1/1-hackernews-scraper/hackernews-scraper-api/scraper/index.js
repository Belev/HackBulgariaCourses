"use strict";

require('./config/mongoose')(require('./config/config')['development']);
var articlesFetcher = require('./articlesFetcher');

articlesFetcher.begin();