let socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('')
    });
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

let locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled');
        alert('Unable to fetch location').text('Send location');
    });
});

// socket.emit('createEmail', {
//     to: 'somedude@example.com',
//     text: 'hi how are you?'
// });

// socket.emit('createMessage', {
//     from: 'somedude@example.com',
//     text: 'doing great how are you?'
// });

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