let socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'somedude@example.com',
    //     text: 'hi how are you?'
    // });

    // socket.emit('createMessage', {
    //     from: 'somedude@example.com',
    //     text: 'doing great how are you?'
    // });


});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message received', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {});
});

// socket.on('newEmail', function (email) {
//     console.log('new email', email);
// });


// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got it', data);
//
// });