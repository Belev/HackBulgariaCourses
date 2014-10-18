"use strict";

var Comment = require('../models/comment');
var currentMaxItemId;

module.exports = {
    /**
     * init is used to set the current max item id if there are some articles in the database
     */
    init: function () {
        Comment.find()
            .sort('-id')
            .exec(function (err, comments) {
                if (err) {
                    throw err;
                }

                if (comments[0]) {
                    currentMaxItemId = comments[0].id;
                }
            })
    },
    getMaxCommentId: function () {
        return currentMaxItemId;
    },
    setMaxCommentId: function (maxItemId) {
        if (maxItemId > currentMaxItemId) {
            currentMaxItemId = maxItemId;
        }
    },
    saveComment: function (commentInfo) {
        if (commentInfo.type !== 'comment') {
            console.log('That is not a comment.');
            return;
        }

        Comment.findOne({id: commentInfo.id}, function (err, comment) {
            if (err) {
                throw err;
            }

            var newComment = {
                by: commentInfo.by,
                id: commentInfo.id,
                parent: commentInfo.parent,
                type: commentInfo.type,
                text: commentInfo.text,
                isRead: false
            };

            if (!comment) {
                Comment.create(newComment, function (err, addedComment) {
                    if (err) {
                        throw err;
                    }

                    console.log(addedComment.id);
                });
            }
        });
    },
    getAllUnreadComments: function (callback) {
        Comment.find()
            .where('isRead').equals(false)
            .exec(function (err, comments) {
                if (err) {
                    return callback(err);
                }

                callback(null, comments);
            });
    }
};