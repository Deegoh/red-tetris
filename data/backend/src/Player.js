const { rows, cols, emptyColor } = require('./constants');
const { client } = require('./dbConnector');
const { tend, genBag } = require('./Piece');
const { sfc32 } = require('./utils');

// https://tetris.wiki/Tetris_Guideline
// https://tetris.wiki/Tetris_(NES,_Nintendo)
// https://tetris.wiki/Wall_kick
// https://tetris.wiki/Scoring

class Player {
  constructor(pseudo, socket, game) {
    this.pseudo = pseudo;
    this.setSocket(socket);
    this.game = game;

    this.state = undefined;

    this.board = undefined;
    this.boardId = undefined;

    this.garbageToDo = undefined;

    // this.loop = undefined;
    this.random = undefined;
    this.timeout = 0;

    this.level = undefined;
    this.lines = undefined;
    this.score = undefined;
    this.pieces = undefined;
    this.sequenceBreak = undefined;

    this.sequence = undefined;

    this.bag = undefined;
    this.piece = undefined;
    this.next = undefined;
    this.hold = undefined;
    this.holdLock = false;
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

  init() {
    this.board = this.generateDefaultBoard();
    this.boardId = 0;

    this.random = sfc32(0x9e3779b9, 0x243f6a88, 0xb7e15162, this.game.rseed);

    this.garbageToDo = 0;

    this.state = 'alive';
    this.hold = undefined;

    this.level = 0;
    this.lines = 0;
    this.score = 0;
    this.pieces = 0;
    this.sequenceBreak = Math.min(Math.max(1, this.game.startDifficulty), 25);

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
      this.bag = genBag();

      for (let i = 1; i < this.game.bagType; i++) {
        this.bag = this.bag.concat(genBag());
      }
    }
    if (this.game.bagType > 0) {
      const choosen = this.bag.splice(this.random() % this.bag.length, 1);
      if (choosen.length === 1) {
        return choosen[0];
      }
    } //
    else {
      const choosen = this.bag[this.random() % this.bag.length];
      return choosen;
    }
  }

  summonPiece() {
    if (this.next === undefined) {
      this.next = this.newGenPiece();
    }

    this.piece = this.next;
    this.next = this.newGenPiece();
    this.pieces += 1;
    this.holdLock = false;
    this.x = Math.floor(cols / 2) - 2;
    this.y = -1;
    this.rot = 0;

    this.sequence = 1;
    if (!this.safeMove(this.x, this.y, this.rot)) {
      this.gameover();
    }
  }

  summonGarbage() {
    if (this.garbageToDo > 0) {
      const removedLine = this.board.shift();

      const couldDoGameOver = removedLine.some((v) => v !== '.');
      const wallType = this.game.garbageType === 'full' ? 'U' : 'W';

      const newLine = Array(cols).fill(wallType);
      if (wallType === 'W') {
        newLine[Math.floor(Math.random() * cols)] = emptyColor;
      }

      this.board.push(newLine);
      this.garbageToDo -= 1;

      if (this.garbageToDo > 0) {
        setTimeout(() => {
          this.summonGarbage();
          this.boardId += 1;
        }, 100);
      } //
      else if (couldDoGameOver) {
        this.gameover();
      }
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
        this.printPiece(copy, this.x, tmpy, this.rot, this.piece, '#');
      }

      this.printPiece(copy, this.x, this.y, this.rot, this.piece);
    }

    this.socket.emit('updateBoard', {
      boardState: { id: this.boardId, board: copy },
      next: this.game.hasPreview
        ? { id: this.next.id, form: this.next.forms[0] }
        : undefined,
      hold: this.game.hasHold
        ? this.hold !== undefined
          ? { id: this.hold.id, form: this.hold.forms[0] }
          : { id: '.', form: [] }
        : undefined,
      score: this.score,
      lines: this.lines,
      level: this.level,
      garbage: this.game.garbageType !== 'no' ? this.garbageToDo : undefined,
    });

    if (this.sequence === 0) {
      this.sendPreviews();
    }
    this.sequence = (this.sequence + 1) % this.sequenceBreak;
  }

  sendPreviews() {
    const localPlayers = Array.from(this.game.players.values()).map((p) => {
      return {
        pseudo: p.pseudo,
        score: p.score,
        boardState: { id: p.pieces, board: p.board },
        state: p.state,
      };
    });

    const availableToPreview = localPlayers.filter((p) => {
      return p.state === 'alive' && p.pseudo !== this.pseudo;
    });

    this.socket.emit('updatePreviewBoards', availableToPreview);
  }

  // previewFirst() {
  //   const localPlayers = Array.from(this.game.players.values()).map((p) => {
  //     return {
  //       pseudo: p.pseudo,
  //       score: p.score,
  //       state: p.state,
  //     };
  //   });
  //   const availableToPreview = localPlayers
  //     .filter((p) => {
  //       return p.state === 'alive' && p.pseudo !== this.pseudo;
  //     })
  //     .toSorted((a, b) => {
  //       return b.score - a.score;
  //     });

  //   if (availableToPreview.length >= 1) {
  //     const nextFirstPlayer = this.game.players.get(
  //       availableToPreview[0].pseudo
  //     );

  //     const copy = structuredClone(nextFirstPlayer.board);
  //     this.printPiece(
  //       copy,
  //       nextFirstPlayer.x,
  //       nextFirstPlayer.y,
  //       nextFirstPlayer.rot,
  //       nextFirstPlayer.piece
  //     );

  //     this.socket.emit('updatePreviewBoard', {
  //       pseudo: nextFirstPlayer.pseudo,
  //       boardState: { id: nextFirstPlayer.boardId, board: copy },
  //       score: nextFirstPlayer.score,
  //     });
  //   }
  // }

  safeMove(px, py, rot) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const dx = j + px;
        const dy = i + py;
        if (this.piece.forms[rot][i][j] !== '.') {
          // dy moved for upper "buffer"
          if (dx < 0 || dx >= cols || dy >= rows) {
            return false;
          } //
          else if (dy >= 0 && this.board[dy][dx] !== '.') {
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
      } //
      else if (this.board[i].every((v) => v !== '.' && v !== 'U')) {
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
    this.garbadeToDo = Math.max(0, this.garbageToDo - linesRemoved);
    this.game.garbageCallback(this.pseudo, linesRemoved - this.garbageToDo);
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

  saveScore() {
    const query = {
      text: `INSERT INTO scores(pseudo, score, level, lines, settings) 
      VALUES($1, $2, $3, $4, $5)`,
      values: [this.pseudo, this.score, this.level, this.lines, '-'],
    };

    client.query(query);
    // .catch((err) => {
    //   console.log(err)
    // });
  }

  gameover() {
    if (this.state === 'alive') {
      this.state = 'lost';
      this.saveScore();
      this.game.endCheck();
      this.drawScreen(0, tend());
    }
  }

  drawScreen(depth, form) {
    this.board[depth] = Array(cols).fill(emptyColor);
    this.boardId += 1;

    if (depth < rows) {
      setTimeout(() => {
        this.drawScreen(depth + 1, form);
      }, 150);
    } //
    else {
      setTimeout(() => {
        this.board = form;
        this.boardId += 1;
      }, 500);
    }
  }

  printPiece(dest, x, y, rot, piece, mod = '') {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const dx = j + x;
        const dy = i + y;
        if (
          piece.forms[rot][i][j] !== '.' &&
          dx >= 0 &&
          dy >= 0 &&
          dx < cols &&
          dy < rows
        ) {
          dest[dy][dx] = `${mod}${piece.id}`;
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
          this.printPiece(this.board, this.x, this.y, this.rot, this.piece);
          this.checkTetris();
          this.summonGarbage();
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
        this.printPiece(this.board, this.x, this.y, this.rot, this.piece);
        this.checkTetris();
        this.summonGarbage();
        this.summonPiece();
        break;

      case 'enter':
        if (this.game.hasHold === true && this.holdLock === false) {
          if (this.hold === undefined) {
            this.hold = this.piece;
            this.summonPiece();
          } else {
            [this.piece, this.hold] = [this.hold, this.piece];
            this.x = Math.floor(cols / 2) - 2;
            this.y = -1;
            this.rot = 0;
            this.sequence = 1;
          }
          this.holdLock = true;
        }
        break;
    }
    this.boardId += 1;
  }
}

module.exports = { Player };
