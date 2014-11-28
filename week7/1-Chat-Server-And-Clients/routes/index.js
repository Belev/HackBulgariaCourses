module.exports.index = function (req, res) {
    res.render('index', {title: 'Express'});
};

module.exports.chatroom = function (req, res) {
    res.render('chatroom', {title: 'Express Chat'});
};
