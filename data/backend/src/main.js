const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, process.env.NODE_ENV === 'development' ? {
  cors: {
    origin:  `http://localhost:${process.env.PORT_FRONT}`,
    methods: ["GET", "POST"]
  }
} : undefined);

app.use((req, res) => {
  res.sendFile(`/build${req.url}`)
})

// app.get('/', (req, res) => {
//   res.sendFile('/build' + req.url);
// });

let rooms = ['test1', 'test2'];

io.on('connection', (socket) => {
  console.log('a user connected');


  socket.on('createRoom', (req) => {
    const name = req.roomname.trim();

    if (!rooms.includes(name)) {
      rooms.push(name);

      socket.emit('notify', {
        status: 'success', 
        text: 'created'
      })
      io.emit('room_list', rooms);
    }
    else {
      socket.emit('notify', {
        status: 'error', 
        text: 'already exists'
      })

    }
  });

  socket.emit('room_list', rooms);
});



server.listen(8080, () => {
  console.log('listening on *:8080');
});