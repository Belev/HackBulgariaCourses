"use strict";

var ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser();

parser.addArgument(
    ['-s', '--size']
);

parser.addArgument(
    ['-o', '--output']
);

module.exports = parser.parseArgs();