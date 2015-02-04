"use strict";

var ArgumentParser = require('argparse').ArgumentParser,
    parser = new ArgumentParser();

parser.addArgument(
    ['--register'],
    {
        action: 'storeConst',
        dest: 'action',
        constant: 'register'
    }
);
parser.addArgument(['--user']);

parser.addArgument(
    ['--getall'],
    {
        action: 'storeConst',
        dest: 'action',
        constant: 'getAllChirps'
    }
);

parser.addArgument(
    ['--getself'],
    {
        action: 'storeConst',
        dest: 'action',
        constant: 'myChirps'
    }
);

parser.addArgument(
    ['--create'],
    {
        action: 'storeConst',
        dest: 'action',
        constant: 'createChirp'
    }
);
parser.addArgument(['--message']);

parser.addArgument(
    ['--delete'],
    {
        action: 'storeConst',
        dest: 'action',
        constant: 'deleteChirp'
    }
);
parser.addArgument(['--chirpId']);

module.exports = {
    args: function () {
        return parser.parseArgs();
    }
};