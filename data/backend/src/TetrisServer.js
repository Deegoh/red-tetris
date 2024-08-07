const { Game } = require('./Game');

function findFirstUnusedId(rooms) {
  let i = 1;
  while (rooms.has(i.toString())) {
    i++;
  }
  return i.toString();
}
const authChars = "$-_.+!*'()";

class TetrisServer {
  constructor() {
    this.init();
  }

  init = () => {
    this.games = new Map();
    this.sdns = new Map();
  };

  setSocketListeners = (socket, io) => {
    console.log(socket.id, socket.conn.id, socket.conn.remoteAddress);

    socket.on('ping', (req) => {
      socket.emit('pong');
    });

    const checkPseudo = (pseudo, page, cb) => {
      if (pseudo.length >= 3 && pseudo.length < 32) {
        if (
          Array.from(pseudo).every(
            (c) =>
              (c >= 'A' && c <= 'Z') ||
              (c >= 'a' && c <= 'z') ||
              (c >= '0' && c <= '9') ||
              authChars.includes(c)
          )
        ) {
          cb();
        } //
        else {
          socket.emit('notify', {
            status: 'error',
            text: "no special characters except $-_.+!*'()",
            page: page,
          });
        }
      } //
      else {
        socket.emit('notify', {
          status: 'error',
          text: 'name must be between 3 and 32 characters long',
          page: page,
        });
      }
    };

    const checkRoom = (roomname, page, cb) => {
      if (this.games.has(roomname)) {
        cb(this.games.get(roomname));
      } //
      else {
        socket.emit('notify', {
          status: 'error',
          text: "room doesn't exists",
          page: page,
        });
      }
    };

    socket.on('createRoom', (req) => {
      const pseudo = req?.pseudo?.toString().trim();

      checkPseudo(pseudo, undefined, () => {
        const current = findFirstUnusedId(this.games);

        this.games.set(current, new Game(current, pseudo));
        this.games.get(current).init();

        socket.emit('notify', {
          status: 'success',
          text: 'created',
          page: `/create#${current}[${pseudo}]`,
        });
        io.emit('room_list', Array.from(this.games.keys()));
      });
    });

    socket.on('joinRoom', (req) => {
      const pseudo = req?.pseudo?.toString().trim();
      const roomname = req?.room?.toString().trim();

      checkPseudo(pseudo, undefined, () => {
        checkRoom(roomname, undefined, (room) => {
          socket.emit('notify', {
            status: 'success',
            text: 'connecting',
            page: `/create#${room.id}[${pseudo}]`,
          });
        });
      });
    });

    socket.on('connectRoom', (req) => {
      const pseudo = req?.pseudo?.toString().trim();
      const roomname = req?.room?.toString().trim();

      checkPseudo(pseudo, '/', () => {
        checkRoom(roomname, '/', (room) => {
          if (!room.players.has(pseudo)) {
            room.initPlayer(pseudo, socket);
            socket.join(room.id);
            this.sdns.set(socket.id, { pseudo: pseudo, roomname: room.id });

            io.emit('room_list', Array.from(this.games.keys()));
          } //
          else {
            // if (prod && host match    => connect)   -------------------

            socket.emit('notify', {
              status: 'error',
              text: 'username already taken in the room',
              page: '/',
            });
          }
        });
      });
    });

    socket.on('startGame', (req) => {
      const pseudo = this.sdns.get(socket.id)?.pseudo;
      const roomname = this.sdns.get(socket.id)?.roomname;

      checkRoom(roomname, '/', (room) => {
        if (room.owner === pseudo) {
          if (room.status === 'waiting') {
            room.status = 'playing';
            room.start(io);

            socket.emit('notify', {
              status: 'success',
              text: 'Starting in 3',
            });
          }
        } //
        else {
          console.log(room.owner, pseudo, roomname);
          socket.emit('notify', {
            status: 'error',
            text: 'you are not the owner of the room',
          });
        }
      });
    });

    socket.on('gameAction', (req) => {
      const pseudo = this.sdns.get(socket.id)?.pseudo;
      const roomname = this.sdns.get(socket.id)?.roomname;

      checkRoom(roomname, '/', (room) => {
        if (
          room.status === 'playing' ||
          ['left', 'right', 'up'].includes(req.action)
        ) {
          room.players.get(pseudo).action(req.action, true);
        }
      });
    });

    socket.emit('room_list', Array.from(this.games.keys()));
  };
}

module.exports = { TetrisServer };
