"use strict";

var nodemailer = require('nodemailer'),
    config = require('./config'),
    transporter = nodemailer.createTransport(config.transporterOptions);

module.exports = {
    // content, from, to, subject, id - optional
    sendEmail: function (info, callback) {
        var emailHtml = info.content.replace(/\n/g, '<br>');

        if (info.id) {
            var href = config.confirmationUrl.replace(/:id/g, info.id);
            emailHtml += config.anchor.replace(/"href"/g, href);
        }

        var mailOptions = {
            from: info.from,
            to: info.to,
            subject: info.subject,
            html: emailHtml
        };

        transporter.sendMail(mailOptions, callback);
    }
};