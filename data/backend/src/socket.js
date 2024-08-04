const { Game } = require("./Game");
const { Player } = require("./Player");

let games = new Map();

let players = new Map();

function findFirstUnusedId(rooms) {
  let i = 1;
  while (rooms.has(i.toString())) {
    i++;
  }
  return i.toString();
}

const authChars = "$-_.+!*'()";

const setSocketListeners = (socket, io) => {
  // console.log("a user connected", socket, 'fafasfsffasfasfsf', io);
  console.log(socket.id, socket.conn.id, socket.conn.remoteAddress);

  socket.on("ping", (req) => {
    socket.emit("pong");
  });

  socket.on("createRoom", (req) => {
    const name = req?.pseudo?.toString().trim();

    if (name.length >= 3 && name.length < 32) {
      if (
        Array.from(name).every(
          (c) =>
            (c >= "A" && c <= "Z") ||
            (c >= "a" && c <= "z") ||
            (c >= "0" && c <= "9") ||
            authChars.include(c),
        )
      ) {
        const current = findFirstUnusedId(games);
        games.set(current, new Game(current, name));

        games.get(current).init(io);

        socket.emit("notify", {
          status: "success",
          text: "created",
          page: `/create#${current}[${name}]`,
        });
        io.emit("room_list", Array.from(games.keys()));
      } //
      else {
        socket.emit("notify", {
          status: "error",
          text: "no special characters except $-_.+!*'()",
        });
      }
    } //
    else {
      socket.emit("notify", {
        status: "error",
        text: "name must be between 3 and 32 characters long",
      });
    }
  });

  // function   verifyUsername(cb, page = undefined) {

  // }

  socket.on("joinRoom", (req) => {
    const name = req?.toString().pseudo?.toString().trim();
    const game = req?.toString().room?.toString().trim();

    if (name.length >= 3 && name.length < 32) {
      if (
        Array.from(name).every(
          (c) =>
            (c >= "A" && c <= "Z") ||
            (c >= "a" && c <= "z") ||
            (c >= "0" && c <= "9") ||
            authChars.include(c),
        )
      ) {
        if (games.has(game)) {
          if (!games.get(game)["players"].has(name)) {
            socket.emit("notify", {
              status: "success",
              text: "connecting",
              page: `/create#${game}[${name}]`,
            });
          } //
          else {
            // if (prod && host match    => connect)   -------------------

            socket.emit("notify", {
              status: "error",
              text: "username already taken in the room",
            });
          }
        } //
        else {
          socket.emit("notify", {
            status: "error",
            text: "room doesn't exists",
          });
        }
      } //
      else {
        socket.emit("notify", {
          status: "error",
          text: "no special characters except $-_.+!*'()",
        });
      }
    } //
    else {
      socket.emit("notify", {
        status: "error",
        text: "name must be between 3 and 32 characters long",
      });
    }
  });

  socket.on("connectRoom", (req) => {
    const name = req?.pseudo?.toString().trim();
    const game = req?.room?.toString().trim();

    if (name.length >= 3 && name.length < 32) {
      if (
        Array.from(name).every(
          (c) =>
            (c >= "A" && c <= "Z") ||
            (c >= "a" && c <= "z") ||
            (c >= "0" && c <= "9") ||
            authChars.include(c),
        )
      ) {
        if (games.has(game)) {
          if (!games.get(game)["players"].has(name)) {
            games
              .get(game)
              [
                "players"
              ].set(name, new Player(name, socket.id, socket.conn.remoteAddress));
            socket.join(game);
            players.set(socket.id, { name: name, game: game });

            // console.log('connect room successs', games);
            console.log("connect room successs", players);
            io.emit("room_list", Array.from(games.keys()));
          } //
          else {
            // if (prod && host match    => connect)   -------------------

            socket.emit("notify", {
              status: "error",
              text: "username already taken in the room",
              page: "/",
            });
          }
        } //
        else {
          socket.emit("notify", {
            status: "error",
            text: "room doesn't exists",
            page: "/",
          });
        }
      } //
      else {
        socket.emit("notify", {
          status: "error",
          text: "no special characters except $-_.+!*'()",
          page: "/",
        });
      }
    } //
    else {
      socket.emit("notify", {
        status: "error",
        text: "name must be between 3 and 32 characters long",
        page: "/",
      });
    }
  });

  socket.on("startGame", (req) => {
    const name = players.get(socket.id)?.name;
    const game = players.get(socket.id)?.game;

    if (games.has(game)) {
      if (games.get(game).owner === name) {
        if (games.get(game).status === "waiting") {
          games.get(game).status = "playing";
          games.get(game).start(socket, io);

          socket.emit("notify", {
            status: "success",
            text: "Starting in 3",
          });
        }
      } //
      else {
        console.log(games.get(game).owner, name, game);
        socket.emit("notify", {
          status: "error",
          text: "you are not the owner of the room",
        });
      }
    } //
    else {
      socket.emit("notify", {
        status: "error",
        text: "room doesn't exists",
        page: "/",
      });
    }
  });

  socket.on("gameAction", (req) => {
    const name = players.get(socket.id)?.name;
    const game = players.get(socket.id)?.game;

    if (games.has(game)) {
      // if (games.get(game).status === 'playing') {

      games.get(game).players.get(name).action(req.action);

      // }
    } //
    else {
      socket.emit("notify", {
        status: "error",
        text: "room doesn't exists",
        page: "/",
      });
    }
  });

  socket.emit("room_list", Array.from(games.keys()));
};

module.exports = { setSocketListeners };
