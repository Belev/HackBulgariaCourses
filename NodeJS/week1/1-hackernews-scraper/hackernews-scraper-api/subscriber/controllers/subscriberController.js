"use strict";

var Subscriber = require('../models/subscriber'),
    uuid = require('node-uuid'),
    emailSender = require('../../emailSender/emailSender');

function areSubscriberTypesValid(types) {
    var storyIndex = types.indexOf('story'),
        commentIndex = types.indexOf('comment');

    var haveNotGotStoryAndComment = storyIndex === -1 && commentIndex === -1,
        haveBothWithOtherType = storyIndex > -1 && commentIndex > -1 && types.length > 2,
        haveStoryOrCommentWithOtherType = ((storyIndex > -1 && commentIndex === -1) || (commentIndex > -1 && storyIndex === -1))
            && types.length > 1;

    return !(haveNotGotStoryAndComment || haveBothWithOtherType || haveStoryOrCommentWithOtherType);
}

module.exports = {
    subscribe: function (req, res, next) {
        if (!areSubscriberTypesValid(req.body.type)) {
            return next('There is invalid type. You can subscribe only for story, comment or both');
        }

        var subscriberInfo = req.body;
        subscriberInfo.subscriberId = uuid.v4();
        subscriberInfo.hasConfirmed = false;

        Subscriber.create(subscriberInfo, function (err, newSubscriber) {
            if (err) {
                return next(err);
            }

            var emailContent = 'You have received this email to confirm your subscription for hacker news.\n';
            emailContent += 'Please click the link below to confirm:\n';

            var emailInfo = {
                from: 'hackernewsapiemail@gmail.com',
                to: newSubscriber.email,
                subject: 'Subscription confirmation',
                content: emailContent,
                id: newSubscriber.subscriberId
            };

            emailSender.sendEmail(emailInfo, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log('Message has been sent successfully.');
            });

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
    },
    confirm: function (req, res, next) {
        var id = req.params.id;
        console.log('Subscriber: ' + id + ' -> confirmation successful.');

        Subscriber.findOneAndUpdate({subscriberId: id}, {hasConfirmed: true}, function (err, subscriber) {
            if (err) {
                return next(err);
            }

            if (!subscriber) {
                return next('There is no such subscriber with this id.');
            }

            res.send('You have successfully confirmed your subscription to hacker news.');
        });
    }
};