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
});

// socket.on('newEmail', function (email) {
//     console.log('new email', email);
// });