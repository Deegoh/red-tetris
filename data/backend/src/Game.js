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

  init() {
    this.rseed = Date.now();

    this.fast = setInterval(() => {
      if (this.status !== 'launching') {
        this.players.forEach((p) => {
          p.frame(this.status);
        });
      }
    }, 1000 / 20);
  }

  initPlayer(pseudo, socket) {
    this.players.set(pseudo, new Player(pseudo, socket));

    const p = this.players.get(pseudo);
    p.init(
      this.rseed,
      (...args) => {
        this.garbageCallback(...args);
      },
      this.garbageType
    );
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
      io.to(this.id).emit('updateBoard', { board: t3() });
    }, 100);
    setTimeout(() => {
      io.to(this.id).emit('updateBoard', { board: t2() });
    }, 1100);
    setTimeout(() => {
      io.to(this.id).emit('updateBoard', { board: t1() });
    }, 2100);
    setTimeout(() => {
      this.status = 'playing';
    }, 3100);
  }
}

module.exports = { Game };
