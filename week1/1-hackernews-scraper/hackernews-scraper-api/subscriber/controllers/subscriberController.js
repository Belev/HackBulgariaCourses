"use strict";

var Subscriber = require('../models/subscriber'),
    uuid = require('node-uuid');

module.exports = {
    subscribe: function (req, res, next) {
        var subscriberInfo = req.body;
        subscriberInfo.subscriberId = uuid.v4();

        Subscriber.create(subscriberInfo, function (err, newSubscriber) {
            if (err) {
                return next(err);
            }

            var returnInfo = {
                email: newSubscriber.email,
                subscriberId: newSubscriber.subscriberId
            };

            res.json(returnInfo);
        });
    },
    unsubscribe: function (req, res, next) {
        var subscriberId = req.body.subscriberId;
        Subscriber.findOneAndRemove({subscriberId: subscriberId}, function (err, removedSubscriber) {
            if (err) {
                return next(err);
            }

            if (!removedSubscriber) {
                return res.json({error: 'There is no subscriber with the given subscriber id: ' + subscriberId});
            }

            res.send('Unsubscribed: ' + subscriberId);
        });
    },
    listSubscribers: function (req, res, next) {
        Subscriber.find()
            .exec(function (err, subscribers) {
                if (err) {
                    return next(err);
                }

                res.json(subscribers);
            });
    }
};