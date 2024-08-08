const { rows, cols, emptyColor } = require('./constants');
const { tend, genBag } = require('./Piece');
const { sfc32 } = require('./utils');

// https://tetris.wiki/Tetris_Guideline
// https://tetris.wiki/Tetris_(NES,_Nintendo)
// https://tetris.wiki/Wall_kick
// https://tetris.wiki/Scoring

class Player {
  constructor(pseudo, socket) {
    this.pseudo = pseudo;
    this.setSocket(socket);

    this.state = undefined;

    this.board = undefined;

    // this.loop = undefined;
    this.random = undefined;

    this.level = undefined;
    this.lines = undefined;
    this.score = undefined;
    this.sequenceBreak = undefined;

    this.sequence = undefined;

    this.bag = undefined;
    this.piece = undefined;
    this.next = undefined;
    this.x = undefined;
    this.y = undefined;
    this.rot = undefined;
  }

  //mandatory mainly for tests
  setSocket(socket) {
    this.socket = socket;
    this.socketId = socket.id;
    this.remoteAddress = socket.conn.remoteAddress;
  }

  init(rseed) {
    this.board = this.generateDefaultBoard();

    this.random = sfc32(0x9e3779b9, 0x243f6a88, 0xb7e15162, rseed);

    this.state = 'alive';

    this.level = 0;
    this.lines = 0;
    this.score = 0;
    this.sequenceBreak = 18;
    this.sequenceBreak = Math.max(this.sequenceBreak, 15); // Should never be lower than 15 with coded levels

    this.bag = [];
    this.summonPiece();
  }

  generateDefaultBoard() {
    return Array(rows)
      .fill()
      .map(() => Array(cols).fill(emptyColor));
  }

  newGenPiece() {
    if (this.bag.length === 0) {
      this.bag = genBag().concat(genBag());
    }
    const choosen = this.bag.splice(this.random() % this.bag.length, 1);
    if (choosen.length === 1) {
      return choosen[0];
    }
  }

  summonPiece() {
    if (this.next === undefined) {
      this.next = this.newGenPiece();
    }

    this.piece = this.next;
    this.next = this.newGenPiece();
    this.x = Math.floor(cols / 2) - 2;
    this.y = -1;
    this.rot = 0;

    this.sequence = 1;
    if (!this.safeMove(this.x, this.y, this.rot)) {
      this.gameover();
    }
  }

  frame(gameStatus) {
    if (
      this.state === 'alive' &&
      gameStatus === 'playing' &&
      this.sequence === 0
    ) {
      this.action('down');
    }

    const copy = structuredClone(this.board);

    if (this.state === 'alive') {
      if (gameStatus === 'playing') {
        let tmpy = this.y;
        for (let i = 0; i < rows; i++) {
          if (this.safeMove(this.x, tmpy + 1, this.rot)) {
            tmpy += 1;
          } //
          else {
            break;
          }
        }
        this.printPiece(copy, this.x, tmpy, '#');
      }

      this.printPiece(copy, this.x, this.y);
    }

    this.socket.emit('updateBoard', {
      board: copy,
      next: this.next.id,
      score: this.score,
      lines: this.lines,
      level: this.level,
      garbage: this.garbageToDo,
    });

    this.sequence = (this.sequence + 1) % this.sequenceBreak;
  }

  safeMove(px, py, rot) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const dx = j + px;
        const dy = i + py;
        if (this.piece.forms[rot][i][j] !== '.') {
          // dy moved for upper "buffer"
          // console.log(dx, dy, cols, rows);
          if (dx < 0 || dx >= cols || dy >= rows) {
            return false;
          } //
          else if (dy >= 0 && this.board[dy][dx] !== '.') {
            // console.log(dx, dy, this.board[dy][dx], this.board);
            return false;
          }
        }
      }
    }
    return true;
  }

  checkTetris() {
    let linesEmpty = 0;
    let linesRemoved = 0;
    for (let i = rows - 1; i >= 0; i--) {
      if (this.board[i].every((v) => v === '.')) {
        linesEmpty++;
      } else if (this.board[i].every((v) => v !== '.')) {
        this.board.splice(i, 1);
        linesRemoved++;
      }
    }
    switch (linesRemoved) {
      case 4:
        this.score += 8000 * (this.level + 1);
        this.score +=
          linesEmpty + linesRemoved === 20 ? 2000 * (this.level + 1) : 0;
        break;
      case 3:
        this.score += 500 * (this.level + 1);
        this.score +=
          linesEmpty + linesRemoved === 20 ? 1800 * (this.level + 1) : 0;
        break;
      case 2:
        this.score += 300 * (this.level + 1);
        this.score +=
          linesEmpty + linesRemoved === 20 ? 1200 * (this.level + 1) : 0;
        break;
      case 1:
        this.score += 100 * (this.level + 1);
        this.score +=
          linesEmpty + linesRemoved === 20 ? 800 * (this.level + 1) : 0;
        break;
    }
    for (let i = 0; i < linesRemoved; i++) {
      this.board.unshift(Array(cols).fill(emptyColor));
      this.lines++;
      if (this.lines % 10 === 0) {
        this.level++;
        if (this.level <= 10 || [13, 16, 19, 29].includes(this.level)) {
          this.sequenceBreak = Math.max(1, this.sequenceBreak - 1);
        }
      }
    }
  }

  gameover() {
    console.log('gameover');
    if (this.pseudo === 'god') {
      this.board = this.generateDefaultBoard();
      return;
    }
    this.state = 'lost';

    this.drawEnd(0);
  }

  drawEnd(depth) {
    this.board[depth] = Array(cols).fill(emptyColor);

    if (depth < rows) {
      setTimeout(() => {
        this.drawEnd(depth + 1);
      }, 200);
    } else {
      setTimeout(() => {
        this.board = tend();
      }, 500);
    }
  }

  printPiece(dest, x, y, mod = '') {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const dx = j + x;
        const dy = i + y;
        if (
          this.piece.forms[this.rot][i][j] !== '.' &&
          dx >= 0 &&
          dy >= 0 &&
          dx < cols &&
          dy < rows
        ) {
          dest[dy][dx] = `${mod}${this.piece.id}`;
        }
      }
    }
  }

  action(act, player = false) {
    if (this.state !== 'alive') {
      return;
    }
    switch (act) {
      case 'up':
        if (
          this.safeMove(
            this.x,
            this.y,
            (this.rot + 1) % this.piece.forms.length
          )
        ) {
          this.rot = (this.rot + 1) % this.piece.forms.length;
        } else if (
          this.safeMove(
            this.x - 1,
            this.y,
            (this.rot + 1) % this.piece.forms.length
          )
        ) {
          this.x -= 1;
          this.rot = (this.rot + 1) % this.piece.forms.length;
        } else if (
          this.safeMove(
            this.x + 1,
            this.y,
            (this.rot + 1) % this.piece.forms.length
          )
        ) {
          this.x += 1;
          this.rot = (this.rot + 1) % this.piece.forms.length;
        }
        break;

      case 'left':
        if (this.safeMove(this.x - 1, this.y, this.rot)) {
          this.x -= 1;
        }
        break;

      case 'down':
        if (this.safeMove(this.x, this.y + 1, this.rot)) {
          this.y += 1;
          if (player === true) {
            this.score++;
          }
          // this.sequence = 1; // ?
        } else {
          this.printPiece(this.board, this.x, this.y);
          this.checkTetris();
          this.summonPiece();
        }
        break;

      case 'right':
        if (this.safeMove(this.x + 1, this.y, this.rot)) {
          this.x += 1;
        }
        break;

      case 'space':
        for (let i = 0; i < rows; i++) {
          if (this.safeMove(this.x, this.y + 1, this.rot)) {
            this.y += 1;
            if (player === true) {
              this.score += 2;
            }
          } //
          else {
            break;
          }
        }
        this.printPiece(this.board, this.x, this.y);
        this.checkTetris();
        this.summonPiece();
        break;
    }
  }
}

module.exports = { Player };
