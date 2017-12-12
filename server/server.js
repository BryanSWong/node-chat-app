const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: 'someguy@example.com',
    //     text: 'hi how are you?',
    //     createdAt: 123
    // });

    socket.emit('newMessage', {
        from: 'someguy@example.com',
        text: 'hi all! :D',
        createdAt: 123
    });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('New message', message)
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});