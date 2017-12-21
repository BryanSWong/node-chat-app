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

let locationButton = jQuery('#send-location');

socket.on('newLocationMessage', function (message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
       socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       });
    }, function () {
        alert('Unable to fetch location');
    });
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