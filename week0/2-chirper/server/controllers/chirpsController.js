"use strict";

var Chirp = require('../models/Chirp'),
    User = require('../models/User');

module.exports = {
    getAllChirps: function (callback) {
        getChirps({}, callback);
    },
    createChirp: function (username, key, chirpText, callback) {
        if (!key) {
            return callback('You are not authenticated to create new chirp.');
        }

        User.findOneAndUpdate()
            .where('name').equals(username)
            .exec(function (err, user) {
                if (err) {
                    return callback(err);
                }

                if (!user) {
                    return callback('Such user does not exists.');
                }

                if (user.key != key) {
                    return callback('The provided user key is not for your account.');
                }

                user.chirps += 1;
                user.save();

                Chirp.create({
                    userId: user.userId,
                    chirpText: chirpText
                }, function (err, chirp) {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, chirp.chirpId);
                });
            });
    },
    getMyChirps: function (username, key, callback) {
        if (!key) {
            return callback('You can not see your chirps because you are not authenticated.');
        }

        User.findOne()
            .where('name').equals(username)
            .select('userId key')
            .exec(function (err, userInfo) {
                if (err) {
                    return callback(err);
                }

                if (!userInfo) {
                    return callback('Such user does not exists.');
                }

                if (userInfo.key !== key) {
                    return callback('The provided user key is not for your account.');
                }

                getChirps({userId: userInfo.userId}, callback);
            });
    },
    deleteChirp: function (key, chirpId, callback) {
        User.findOne()
            .where('key').equals(key)
            .exec(function (err, user) {
                if (err) {
                    return callback(err);
                }

                if (!user) {
                    return callback('User with this key does not exists.');
                }

                user.chirps -= 1;
                user.save();

                Chirp.findOneAndRemove({ chirpId: chirpId, userId: user.userId })
                    .exec(function (err, removeChirp) {
                        if (err) {
                            return callback(err);
                        }

                        if (!removeChirp) {
                            return callback('Such chirp does not exists or you are not the creator of the chirp.');
                        }

                        callback(null, removeChirp);
                    });
            });
    },
    getChirpByIdOrUserId: function (chirpId, userId, callback) {
        if (!chirpId && !userId) {
            return callback('Can not get chirps without some kind of id.');
        }

        if ((chirpId && userId) || userId) {
            Chirp.find()
                .where('userId').equals(userId)
                .exec(function (err, data) {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, data);
                });
        } else {
            Chirp.find()
                .where('chirpId').equals(chirpId)
                .exec(function (err, chirp) {
                    if (err) {
                        return callback(err);
                    }

                    callback(null, chirp);
                });
        }
    }
};

function getChirps(condition, callback) {
    Chirp.find(condition)
        .sort('-chirpTime')
        .select('userId chirpId chirpText chirpTime')
        .exec(function (err, collection) {
            if (err) {
                return callback(err);
            }

            callback(null, collection);
        });
}