"use strict";

exports.initialize = function (server) {
    var io = require('socket.io')(server);
    var self = this;

    this.chatInfrastructure = io.of('/chatInfrastructure');
    this.chatInfrastructure.on('connection', function (socket) {
        socket.on('setName', function (data) {
            socket.emit('nameSet', data);
            socket.send(JSON.stringify({
                type: 'welcomeMessage',
                message: 'You successfully entered room - ' + data.roomName + ' - in Awesome Multi-room Chat!'
            }));

            socket.broadcast.emit('userEntered', data);
        });

        socket.on('joinRoom', function (data) {
            var roomName = data.roomName;

            socket.join(roomName);

            var communicationSocket = self.chatCommunication.connected[socket.id];

            communicationSocket.join(roomName);
            communicationSocket.room = roomName;
        });
    });


    this.chatCommunication = io.of('/chatCommunication');
    this.chatCommunication.on('connection', function (socket) {
        socket.on('message', function (messageInfo) {
            messageInfo = JSON.parse(messageInfo);

            if (messageInfo.type == 'userMessage') {
                socket.in(socket.room).broadcast.send(JSON.stringify(messageInfo));

                messageInfo.type = 'myMessage';
                socket.send(JSON.stringify(messageInfo));
            }
        });
    });
};