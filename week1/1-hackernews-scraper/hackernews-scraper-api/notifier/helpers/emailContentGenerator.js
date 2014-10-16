"use strict";

module.exports = {
    /**
     * By given articles, the function generates the email content
     * @param articles - All new articles for which subscriber is looking for
     * @returns {string} Returns the whole email content which will be send to the subscribers
     */
    generateEmailContent: function (articles) {
        var emailContent = 'Hello, you have subscribed for hacker news articles.\n';
        emailContent += 'We have got new list of articles for you. Check the list below.\n';

        articles.forEach(function (article) {
            emailContent += article.title + ' -> ' + article.url;
        });

        return emailContent;
    }
};