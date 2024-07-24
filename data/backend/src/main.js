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


  socket.on('createRoom', (obj) => {
    const name = obj.roomname;

    if (!Array.from(name).some(e => "0123456789".includes(e))) {
      rooms.push(name);

      socket.emit('room_creation_res', 'success')
      io.emit('room_list', rooms);
    }
    else {
      socket.emit('room_creation_res', 'error')

    }
  });


  socket.emit('room_list', rooms)
});



server.listen(8080, () => {
  console.log('listening on *:8080');
});