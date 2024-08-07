const { t3, t2, t1 } = require('./Piece');
const { Player } = require('./Player');

class Game {
  constructor(id, owner) {
    this.id = id;
    this.players = new Map();

    this.owner = owner;

    this.rseed = 42;

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
    p.init(this.rseed);
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
