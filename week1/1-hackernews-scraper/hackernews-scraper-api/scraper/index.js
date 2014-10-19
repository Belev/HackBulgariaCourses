"use strict";

require('./config/mongoose')(require('./config/config')['development']);
var itemsFetcher = require('./itemsFetcher');

itemsFetcher.begin();