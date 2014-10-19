"use strict";
var config = require('../config/config'),
    getItemsForEmails = require('../helpers/getItemsForEmails'),
    emailContentGenerator = require('../helpers/emailContentGenerator'),
    emailSender = require('../../emailSender/emailSender');

module.exports = {
    sendHelloMessage: function (req, res) {
        var helloMessage = 'Hello, you have started the notifier api. ';
        helloMessage += 'If the scraper api is started, and there are new articles which you are interested in, ';
        helloMessage += 'you will receive email/s soon. ';
        helloMessage += 'Keep calm and learn to code. : )';

        res.send(helloMessage);
    },
    /**
     * By given all subscribers and their articles in which they are interested
     * send emails to everyone of them, to notify them that there are new articles
     * in which they are interested
     * @param req - the standard request object
     * @param res - the standard response object
     */
    notifySubscribedUsers: function (req, res) {
        getItemsForEmails(function (err, subscribersItems) {
            if (err) {
                throw err;
            }

            if (Object.keys(subscribersItems).length > 0) {
                console.log('Sending emails');

                Object.keys(subscribersItems)
                    .forEach(function (subscriberId, i) {
                        var items = {
                                articles: subscribersItems[subscriberId].articles,
                                comments: subscribersItems[subscriberId].comments
                            },
                            subscriberEmail = subscribersItems[subscriberId].email;

                        if (items.articles.length === 0 && items.comments.length === 0) {
                            return;
                        }

                        var emailContent = emailContentGenerator.generateEmailContent(items);
                        var info = {
                            content: emailContent + '\n',
                            from: config.from,
                            to: subscriberEmail,
                            subject: 'New articles from hacker news.'
                        };

                        emailSender.sendEmail(info, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            console.log('Message has been sent successfully.');
                        });
                    });

                res.send('Sending emails ended.');
            } else {
                console.log('There are no interesting new articles or comments for subscribers to send emails to.');
                res.send('There are no interesting new articles or comments for subscribers to send emails to.');
            }
        });
    }
};