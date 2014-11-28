module.exports.index = function (req, res) {
    res.render('index', {title: 'Express Chat'});
};

module.exports.chatroom = function (req, res) {
    res.render('chatroom', {title: 'Express Chat'});
};
