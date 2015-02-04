var $messages = $('#messages');
var $message = $('#message');
var $sendBtn = $('#send');
var currentUser;

var chatInfrastructure = io.connect('http://localhost:8080/chatInfrastructure');
var chatCommunication = io.connect('http://localhost:8080/chatCommunication');

// get query parameter value, if no such query parameter then the use is in the global room
var roomName = (location.search.match(/room=(.+?)(&|$)/) || [, 'global'])[1];

chatInfrastructure.on('nameSet', function (data) {
    currentUser = data.name;

    chatInfrastructure.emit('joinRoom', {'roomName': roomName, 'username': currentUser});

    $('#nameform').hide();
    $messages.append('<div class="welcomeMessage">' + 'Hello ' + '<strong>' + currentUser + '</strong>,</div>');

    chatInfrastructure.on('userEntered', function (user) {
        $messages.append('<div class="systemMessage">' + '<strong>' + user.name + '</strong> has joined the room - ' + user.roomName + '.</div>');
    });

    chatInfrastructure.on('message', function (data) {
        var messageInfo = JSON.parse(data);
        $messages.append('<div class="' + messageInfo.type + '">' + messageInfo.message + '</div>');
    });
});

chatCommunication.on('message', function (data) {
    var messageInfo = JSON.parse(data);

    $messages.append('<div class="' + messageInfo.type + '"><strong><span class="name">' + messageInfo.username + ":</span></strong> " + messageInfo.message + '</div>');

    $messages[0].scrollTop = $messages[0].scrollHeight;
});

// once the document is ready, all events are attached
$(function () {
    $sendBtn.on('click', function () {
        var data = {
            username: currentUser,
            message: $message.val(),
            type: 'userMessage'
        };

        chatCommunication.send(JSON.stringify(data));
        $message.val('');
    });

    $('#setname').on('click', function () {
        chatInfrastructure.emit('setName', {name: $('#nickname').val(), roomName: roomName});
    });
});