const express = require('express');
const http = require('http');
const {Server} = require('socket.io')
const cors = require('cors'); // Import the cors middleware

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  });

io.on('connection', (socket) => {
    console.log('A new connection is made ...');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
    });

    socket.on('disconnect', () => {
        console.log('User has disconnected ...');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
