const { rows, cols, emptyColor } = require("./constants");
const { genPiece } = require("./Piece");
const { sfc32 } = require("./utils");

const generateDefaultBoard = () => {
  return Array(rows)
    .fill()
    .map(() => Array(cols).fill(emptyColor));
};

class Player {
  constructor(pseudo, socket) {
    this.pseudo = pseudo;
    this.socket = socket;
    this.socketId = socket.id;
    this.addr = socket.conn.remoteAddress;

    this.state = "normal";

    this.board = undefined;

    this.loop = undefined;
    this.random = undefined;

    this.sequence = 1;
    this.sequenceBreak = 20;
    this.piece = undefined;
    this.next = undefined;
    this.x = -1;
    this.y = -1;
    this.rot = 0;

    this.lastChance = false;
  }

  init(rseed) {
    this.board = generateDefaultBoard();

    this.random = sfc32(0x9e3779b9, 0x243f6a88, 0xb7e15162, rseed);

    this.summonPiece();
  }

  summonPiece() {
    if (this.next === undefined) {
      this.next = genPiece(this.random());
    }

    this.piece = this.next;
    this.next = genPiece(this.random());
    this.x = Math.floor(cols / 2) - 2;
    this.y = 0;
    this.rot = 0;

    this.sequence = 1;
    this.lastChance = true;
  }

  frame(status) {
    if (status === "playing" && this.sequence === 0) {
      this.action("down");
    }

    const copy = structuredClone(this.board);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const dx = j + this.x;
        const dy = i + this.y;
        if (
          this.piece.forms[this.rot][i][j] !== "." &&
          dx >= 0 &&
          dx >= 0 &&
          dx < cols &&
          dy < rows
        ) {
          copy[dy][dx] = this.piece.id;
        }
      }
    }

    this.socket.emit("updateBoard", { board: copy, next: this.next.id });

    this.sequence = (this.sequence + 1) % this.sequenceBreak;
  }

  safeMove(px, py, rot) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const dx = j + px;
        const dy = i + py;
        if (this.piece.forms[rot][i][j] !== ".") {
          if (dx < 0 || dx < 0 || dx >= cols || dy >= rows) {
            return false;
          } //
          else if (this.board[dy][dx] !== ".") {
            return false;
          }
        }
      }
    }
    return true;
  }

  printPiece() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const dx = j + this.x;
        const dy = i + this.y;
        if (this.piece.forms[this.rot][i][j] !== ".") {
          this.board[dy][dx] = this.piece.id;
        }
      }
    }
    return true;
  }

  action(act) {
    switch (act) {
      case "up":
        if (
          this.safeMove(
            this.x,
            this.y,
            (this.rot + 1) % this.piece.forms.length,
          )
        ) {
          this.rot = (this.rot + 1) % this.piece.forms.length;
        }
        break;

      case "left":
        if (this.safeMove(this.x - 1, this.y, this.rot)) {
          this.x -= 1;
        } else {
          console.log("forbidden move");
        }
        break;

      case "down":
        if (this.safeMove(this.x, this.y + 1, this.rot)) {
          this.y += 1;
          this.lastChance |= true;
          // this.sequence = 1; // ?
        } //
        else if (this.lastChance === true) {
          this.lastChance = false;
          console.log("consume chance");
        } //
        else {
          this.printPiece();
          this.summonPiece();
        }
        break;

      case "right":
        if (this.safeMove(this.x + 1, this.y, this.rot)) {
          this.x += 1;
        } else {
          console.log("forbidden move");
        }
        break;

      case "space":
        for (let i = 0; i < rows; i++) {
          if (this.safeMove(this.x, this.y + 1, this.rot)) {
            this.y += 1;
          } //
          else {
            break;
          }
        }
        this.printPiece();
        this.summonPiece();
        break;
    }
  }
}

module.exports = { Player };
