const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { setSocketListeners } = require("./socket");

const app = express();

app.use((req, res) => {
  res.sendFile(`/build${req.url}`);
});

const server = http.createServer(app);

const io = new Server(
  server,
  process.env.NODE_ENV === "development"
    ? {
        cors: {
          origin: `http://localhost:${process.env.PORT_FRONT}`,
          methods: ["GET", "POST"],
        },
      }
    : undefined,
);

io.on("connection", (socket) => {
  setSocketListeners(socket, io);
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
