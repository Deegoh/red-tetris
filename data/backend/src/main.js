const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { TetrisServer } = require('./TetrisServer');
const fs = require("fs");

const app = express();

app.use((req, res) => {
  if (fs.existsSync(`/build${req.url}`)) {
    res.sendFile(`/build${req.url}`);
  }
  else {
    res.sendFile(`/build/index.html`);
  }
});

const server = http.createServer(app);

const io = new Server(
  server,
  process.env.NODE_ENV === 'development'
    ? {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      }
    : undefined
);

const tetris = new TetrisServer();

io.on('connection', (socket) => {
  tetris.setSocketListeners(socket, io);
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});
