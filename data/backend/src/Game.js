const { t3, t2, t1 } = require('./Piece');
const { Player } = require('./Player');

class Game {
  constructor(id, owner) {
    this.id = id;
    this.players = new Map();

    this.owner = owner;

    this.rseed = 42;
    this.garbageType = 'hole'; // 'full' | 'no' | 'hole'

    this.status = 'waiting';
    this.slow = undefined;
    this.fast = undefined;
  }

  init(io, sdns, games) {
    this.rseed = Date.now();

    this.fast = setInterval(() => {
      if (this.status !== 'launching') {
        this.players.forEach((p) => {
          if (p.state !== 'spectate') {
            p.frame(this.status);
          }
        });
      }
    }, 1000 / 20);

    this.slow = setInterval(() => {
      const localPlayers = Array.from(this.players.values());

      this.players.forEach((p) => {
        const entry = sdns.get(p.socketId);
        if (
          entry !== undefined &&
          p.pseudo === entry.pseudo &&
          this.id === entry.roomname
        ) {
          p.timeout = 0;
        } else {
          p.timeout += 1;
          if (p.timeout >= 5 && p.pseudo === this.owner) {
            const alives = localPlayers.filter((p2) => {
              return p2.timeout < 5;
            });
            if (alives.length > 0) {
              this.owner = alives[0].pseudo;

              io.to(this.id).emit('notify', {
                status: 'info',
                code: 'OWNER_CHANGE',
                text: `Owner of the game changed to ${this.owner}`,
              });
            } else {
              clearInterval(this.slow);
              clearInterval(this.fast);
              games.delete(this.id);
            }
          }
        }
      });

      io.to(this.id).emit('updateGameState', {
        id: this.id,
        status: this.status,
        owner: this.owner,
        players: localPlayers.map((p) => {
          return {
            pseudo: p.pseudo,
            score: p.score,
            rows: p.rows,
            level: p.level,
            connected: p.timeout,
          };
        }),
      });
    }, 1500);
  }

  initPlayer(pseudo, socket) {
    this.players.set(pseudo, new Player(pseudo, socket));

    const p = this.players.get(pseudo);
    if (this.status === 'waiting') {
      p.init(
        this.rseed,
        (...args) => {
          this.garbageCallback(...args);
        },
        this.garbageType
      );
    } //
    else {
      p.state = 'spectate';
    }
  }

  garbageCallback(pseudo, size) {
    if (size <= 1 || this.garbageType === 'no') {
      return;
    }
    this.players.forEach((p, key) => {
      if (p.state === 'alive' && key !== pseudo) {
        p.garbageToDo += size - 1;
      }
    });
  }

  start(io) {
    this.status = 'launching';
    setTimeout(() => {
      io.to(this.id).emit('updateBoard', {
        boardState: { id: -30, board: t3() },
      });
    }, 100);
    setTimeout(() => {
      io.to(this.id).emit('updateBoard', {
        boardState: { id: -29, board: t2() },
      });
    }, 1100);
    setTimeout(() => {
      io.to(this.id).emit('updateBoard', {
        boardState: { id: -28, board: t1() },
      });
    }, 2100);
    setTimeout(() => {
      this.status = 'playing';
    }, 3100);
  }
}

module.exports = { Game };
