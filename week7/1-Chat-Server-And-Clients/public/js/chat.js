var $messages = $('#messages');
var $message = $('#message');
var $sendBtn = $('#send');
var currentUser;

var socket = io.connect('http://localhost:8080');

socket.on('nameSet', function (data) {
    $('#nameform').hide();
    currentUser = data.name;
    $messages.append('<div class="systemMessage">' + 'Hello ' + currentUser + ',</div>');
});

socket.on('message', function (data) {
    data = JSON.parse(data);

    if (data.username) {
        $messages.append('<div class="' + data.type + '"><strong><span class="name">' + data.username + ":</span></strong> " + data.message + '</div>');
    } else {
        $messages.append('<div class="' + data.type + '">' + data.message + '</div>');
    }

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

        socket.send(JSON.stringify(data));
        $message.val('');
    });

    $('#setname').click(function () {
        socket.emit("setName", {name: $('#nickname').val()});
    });
});