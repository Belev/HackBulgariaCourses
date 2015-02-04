"use strict";

var UsersController,
    ChirpsController;

module.exports = {
    init: function (config) {
        require('../config/mongoose')(config);
        UsersController = require('./usersController');
        ChirpsController = require('./chirpsController');
    },
    registerUser: function (username, callback) {
        UsersController.registerUser(username, callback);
    },
    getAllUsers: function (callback) {
        UsersController.getAllUsers(callback);
    },
    getAllChirps: function (callback) {
        ChirpsController.getAllChirps(callback);
    },
    createChirp: function (username, key, chirpText, callback) {
        ChirpsController.createChirp(username, key, chirpText, callback);
    },
    getMyChirps: function (username, key, callback) {
        ChirpsController.getMyChirps(username, key, callback);
    },
    deleteChirp: function (key, chirpId, callback) {
        ChirpsController.deleteChirp(key, chirpId, callback);
    },
    getChirpByIdOrUserId: function (chirpId, userId, callback) {
        ChirpsController.getChirpByIdOrUserId(chirpId, userId, callback);
    }
};