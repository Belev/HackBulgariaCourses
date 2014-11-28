"use strict";

exports.initialize = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        socket.on('message', function (messageInfo) {
            messageInfo = JSON.parse(messageInfo);

            if (messageInfo.type == "userMessage") {
                socket.broadcast.send(JSON.stringify(messageInfo));
                messageInfo.type = "myMessage";
                socket.send(JSON.stringify(messageInfo));
            }
        });

        socket.on("setName", function (data) {
            socket.emit('nameSet', data);
            socket.send(JSON.stringify({
                type: 'serverMessage',
                message: 'You successfully entered Awesome Multi-room Chat!'
            }));
        });
    });
};