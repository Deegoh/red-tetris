let rooms = ["test1", "test2"];

const setSocketListeners = (socket, io) => {
  console.log("a user connected");

  socket.on("ping", (req) => {
    socket.emit("pong");
  });

  socket.on("createRoom", (req) => {
    const name = req.roomname.trim();

    if (!rooms.includes(name)) {
      rooms.push(name);

      socket.emit("notify", {
        status: "success",
        text: "created",
      });
      io.emit("room_list", rooms);
    } else {
      socket.emit("notify", {
        status: "error",
        text: "already exists",
      });
    }
  });

  socket.emit("room_list", rooms);
};

module.exports = { setSocketListeners };
