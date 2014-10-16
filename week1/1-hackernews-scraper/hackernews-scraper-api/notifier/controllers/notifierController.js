"use strict";
var nodeMailer = require('nodemailer'),
    config = require('../config/config'),
    transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: config.userInfo.auth
    }),
    getArticlesForEmails = require('../helpers/getArticlesForEmails'),
    emailContentGenerator = require('../helpers/emailContentGenerator');

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
        getArticlesForEmails(function (err, subscribersArticles) {
            if (err) {
                throw err;
            }

            console.log('Sending emails');

            Object.keys(subscribersArticles)
                .forEach(function (subscriberId) {
                    var articles = subscribersArticles[subscriberId].articles,
                        subscriberEmail = subscribersArticles[subscriberId].email;

                    if (articles.length === 0) {
                        return;
                    }

                    var emailContent = emailContentGenerator.generateEmailContent(articles);

                    var mailOptions = {
                        from: config.from,
                        to: subscriberEmail,
                        subject: 'New articles from hacker news.',
                        text: emailContent,
                        html: emailContent.replace(/\n/g, '<br><br>')
                    };

                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        console.log('Message has been sent successfully.');
                    });
                });

            res.send('Sending emails ended.');
        });
    }
};