"use strict";

module.exports = {
    renderIndex: function (req, res) {
        res.render('index', {title: 'Express Chat'});
    }
};