const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();
let rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('join', (params, callback) => {
        let room = params.room.toLowerCase(); // lets anybody join room regardless of case.
        let name = params.name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        }); // makes the the names unique even with different casing and caps the first letter.

        if(!isRealString(name) || ! isRealString(room)){
            return callback('Name and room name are required.');
        }

        let people = users.getUserList(room);

        for(i = 0; i < people.length; i++) {
            if(people[i] === name){
                return callback('Name is in use, please use another.');
            }
        }

        //let select = jQuery('<select></select>');
        // users.forEach(function (user) {
        //     select.append(jQuery('<option></option>').text(user.room));
        // });
        // jQuery('#a_room').html(select);

        socket.join(room);
        users.removeUser(socket.id);
        users.addUser(socket.id, name, room);
        io.to(room).emit('updateUserList', users.getUserList(room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }


        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

// socket.emit('newEmail', {
//     from: 'someguy@example.com',
//     text: 'hi how are you?',
//     createdAt: 123
// });

// socket.emit('newMessage', {
//     from: 'someguy@example.com',
//     text: 'hi all! :D',
//     createdAt: 123
// });

// socket.on('createEmail', (newEmail) => {
//     console.log('createEmail', newEmail);
// });


//socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

// socket.broadcast.emit('newMessage', generateMessage('Admin','New user has joined'));

// targeting rooms
// io.emit --> io.to(params.room).emit
// socket.broadcast.emit --> socket.broadcast.to(params.room).emit