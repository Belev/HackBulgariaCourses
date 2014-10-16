"use strict";

module.exports = {
    /**
     * The function filters the articles for every subscriber and checks if the subscriber is interested in such article
     * @param subscribers - all subscribers from database
     * @param articles - all unread articles from database
     * @returns {{}} - dictionary with every subscriber id and as value the subscriber email and all articles for which he/she is looking
     */
    getSubscribersInterestingArticles: function (subscribers, articles) {
        var helpers = {
            hasArticleAnyKeyword: function (text, keywords) {
                var keywordsAsString = keywords.join('|'),
                    searchForAtLeastOneKeyword = '/' + keywordsAsString + '/gi';

                return text.match(searchForAtLeastOneKeyword) !== null;
            },
            /**
             * The function add new article to the other articles of some subscriber
             * @param subscribersArticles - the dictionary in which we store the filtered information
             * @param article - article which will be added to the articles for the current subscriber
             * @param subscriber - the subscriber which is interested in some articles
             */
            addArticleToSubscriber: function (subscribersArticles, article, subscriber) {
                var id = subscriber.id;

                if (!subscribersArticles[id]) {
                    subscribersArticles[id] = {};
                    subscribersArticles[id].email = subscriber.email;
                    subscribersArticles[id].articles = [];
                }


                subscribersArticles[id].articles.push({
                    url: article.url,
                    title: article.title
                });
            },
            markAllArticlesAsRead: function (articles) {
                articles.forEach(function (article) {
                    article.isRead = true;
                    article.save();
                });
            }
        };

        var subscribersArticles = {};

        subscribers.forEach(function (subscriber) {
            var keywords = subscriber.keywords;

            articles.forEach(function (article) {
                if (helpers.hasArticleAnyKeyword(article.title, keywords)) {
                    helpers.addArticleToSubscriber(subscribersArticles, article, subscriber);
                }
            });
        });

        helpers.markAllArticlesAsRead(articles);
        return subscribersArticles;
    }
};