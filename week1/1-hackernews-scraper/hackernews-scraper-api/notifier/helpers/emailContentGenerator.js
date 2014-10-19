"use strict";

module.exports = {
    /**
     * By given articles, the function generates the email content
     * @param items - All new articles and comments for which subscriber is looking for
     * @returns {string} Returns the whole email content which will be send to the subscribers
     */
    generateEmailContent: function (items) {
        var emailContent = 'Hello, you have subscribed for hacker news articles.\n';
        emailContent += 'We have got new list of items for you. Check the list below.\n\n';

        if (items.articles.length > 0) {
            emailContent += 'New interesting articles:\n';
            items.articles.forEach(function (article) {
                emailContent += article.title + ' -> ' + article.url;
            });

            emailContent += '\n\n\n';
        }

        if (items.comments.length > 0) {
            emailContent += 'New interesting comments with article url:\n';
            items.comments.forEach(function (comment) {
                emailContent += comment.text + ' -> ' + comment.url + '\n\n';
            });
        }

        return emailContent;
    }
};