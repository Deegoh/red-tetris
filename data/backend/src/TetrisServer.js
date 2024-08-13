const { client } = require('./dbConnector');
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

  listGames = () => {
    const list = Array.from(this.games?.values()).map((g) => {
      return {
        id: g.id,
        owner: g.owner,
        actives: Array.from(g.players.values()).reduce((current, p) => {
          return Array.from(this.sdns.values()).find((d) => {
            return g.id === d.roomname && p.pseudo === d.pseudo;
          }) !== undefined
            ? current + 1
            : current;
        }, 0),
      };
    });
    return list;
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
            code: 'SPECIALS_CHARS',
            text: "no special characters except $-_.+!*'()",
            page: page,
          });
        }
      } //
      else {
        socket.emit('notify', {
          status: 'error',
          code: 'PSEUDO_LENGTH',
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
          code: 'ROOM_404',
          text: "room doesn't exists",
          page: page,
        });
      }
    };

    socket.on('disconnect', (reason) => {
      // const roomname = this.sdns.get(socket.id)?.roomname
      // socket.leave(roomname.toString());

      this.sdns.delete(socket.id);
      io.emit('roomList', this.listGames());
    });

    socket.on('createRoom', (req) => {
      const pseudo = req?.pseudo?.toString().trim();
      const gameSettings = req?.gameSettings;

      checkPseudo(pseudo, undefined, () => {
        const current = findFirstUnusedId(this.games);

        this.games.set(current, new Game(current, pseudo, gameSettings));
        const room = this.games.get(current);
        room.init(io, this.sdns, this.games);
        room.initPlayer(pseudo, socket);

        socket.emit('notify', {
          status: 'success',
          code: 'ROOM_CREATED',
          text: 'created',
          page: `/create#${current}[${pseudo}]`,
        });
        io.emit('roomList', this.listGames());
      });
    });

    socket.on('joinRoom', (req) => {
      const pseudo = req?.pseudo?.toString().trim();
      const roomname = req?.room?.toString().trim();

      checkPseudo(pseudo, undefined, () => {
        checkRoom(roomname, undefined, (room) => {
          const player = room.players.get(pseudo);

          if (player === undefined) {
            room.initPlayer(pseudo, socket);

            socket.emit('notify', {
              status: 'success',
              code: 'ROOM_JOINED',
              text: 'connecting',
              page: `/create#${room.id}[${pseudo}]`,
            });
          } //
          else if (player.remoteAddress === socket.conn.remoteAddress) {
            socket.emit('notify', {
              status: 'info',
              code: 'ALREADY_SUBSCRIBED',
              text: 'you are already subscribed to this room',
              page: `/create#${room.id}[${pseudo}]`,
            });
          } //
          else {
            socket.emit('notify', {
              status: 'error',
              code: 'USERNAME_TAKEN',
              text: 'username already taken in the room',
              page: '/',
            });
          }
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
          }

          const player = room.players.get(pseudo);

          if (
            player !== undefined &&
            player.remoteAddress == socket.conn.remoteAddress
          ) {
            const entry = this.sdns.get(socket.id);
            if (entry !== undefined) {
              socket.leave(entry.roomname.toString());
            }
            //
            if (
              player.socket !== undefined &&
              player.socketId !== socket.id &&
              player.socket.connected == true
            ) {
              player.socket.emit('notify', {
                status: 'warning',
                code: 'MOVE_HANDLE',
                text: 'moving handle to another game agent',
                page: '/',
              });
              this.sdns.delete(player.socketId);
            }
            player.setSocket(socket);
            this.sdns.set(socket.id, { pseudo: pseudo, roomname: room.id });
            socket.join(room.id);

            socket.emit('notify', {
              status: 'success',
              code: 'ROOM_CONNECTED',
              text: 'connecting',
            });

            io.emit('roomList', this.listGames());
          } //
          else {
            socket.emit('notify', {
              status: 'error',
              code: 'USERNAME_TAKEN',
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
              code: 'STARTING_GAME',
              text: 'Starting in 3',
            });
          }
        } //
        else {
          console.log(room.owner, pseudo, roomname);
          socket.emit('notify', {
            status: 'error',
            code: 'NOT_OWNER',
            text: 'you are not the owner of the room',
          });
        }
      });
    });

    socket.on('gameAction', (req) => {
      const entry = this.sdns.get(socket.id);

      if (entry !== undefined) {
        const pseudo = entry.pseudo;
        const roomname = entry.roomname;

        checkRoom(roomname, '/', (room) => {
          if (
            room.status === 'playing' ||
            ['left', 'right', 'up'].includes(req.action)
          ) {
            room.players.get(pseudo).action(req.action, true);
          }
        });
      } //
      else {
        socket.emit('notify', {
          status: 'error',
          code: 'NOT_REGISTERED',
          text: 'you are not registered in a room (anymore?)',
          page: '/',
        });
      }
    });

    socket.on('getLeaderboard', () => {
      const query = {
        text: `SELECT pseudo, score, settings FROM scores
        WHERE score > 0
        ORDER BY score DESC`,
      };

      client.query(query).then((res) => {
        socket.emit('leaderboardRes', res.rows);
      });
      // .catch((err) => {
      //   console.log(err)
      // });
    });

    socket.emit('roomList', this.listGames());
  };
}

module.exports = { TetrisServer };
