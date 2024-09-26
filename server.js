const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Dokunma olayını al ve tüm kullanıcılara gönder
    socket.on('touch', (data) => {
        socket.broadcast.emit('touch', data); // Tüm kullanıcılara yay
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});
