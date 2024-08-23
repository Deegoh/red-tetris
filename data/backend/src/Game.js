const { t3, t2, t1, twin } = require('./Piece');
const { Player } = require('./Player');

class Game {
  constructor(id, owner, gameSettings) {
    this.id = id;
    this.players = new Map();

    this.owner = owner;

    this.rseed = 42;
    this.garbageType = ['full', 'no', 'hole'].includes(
      gameSettings?.garbageType
    )
      ? gameSettings?.garbageType
      : 'full';
    this.hasHold =
      gameSettings?.hold?.toString() !== undefined
        ? gameSettings.hold.toString() === '1'
        : false;
    this.hasPreview =
      gameSettings?.preview?.toString() !== undefined
        ? gameSettings.preview.toString() === '1'
        : true;

    this.bagType =
      gameSettings?.bagType !== undefined &&
      parseInt(gameSettings?.bagType) !== NaN
        ? parseInt(gameSettings.bagType)
        : 2;
    this.bagType = Math.max(Math.min(this.bagType, 10), 0);
    this.startDifficulty =
      gameSettings?.difficulty !== undefined
        ? 25 - gameSettings.difficulty
        : 15;

    this.status = 'waiting'; // 'waiting' | 'launching' | 'playing'
    this.slow = undefined;
    this.fast = undefined;
  }

  init(io, sdns, games) {
    this.rseed = Date.now();

    this.fast = setInterval(() => {
      if (this.status !== 'launching') {
        this.players.forEach((p) => {
          if (
            p.state !== 'spectate' &&
            sdns.get(p.socketId)?.roomname === this.id &&
            sdns.get(p.socketId)?.pseudo === p.pseudo
          ) {
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
              return;
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
    this.players.set(pseudo, new Player(pseudo, socket, this));

    const p = this.players.get(pseudo);
    if (this.status === 'waiting') {
      p.init();
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

  endCheck() {
    const alives = Array.from(this.players.values()).filter((p) => {
      return p.state === 'alive';
    });
    if (alives.length === 1) {
      const pl = this.players.get(alives[0].pseudo);
      pl.state = 'won';
      pl.saveScore();
      pl.drawScreen(0, twin());
    }
    if (alives.length <= 1) {
      setTimeout(() => {
        this.status = 'waiting';
        this.rseed = Date.now();
        this.players.forEach((p) => {
          p.init();
        });
      }, 8000);
    }
  }
}

module.exports = { Game };
