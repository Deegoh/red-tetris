const { genPiece, t3, t2, t1 } = require("./Piece");
const { sfc32 } = require("./utils");
const { rows, cols, emptyColor } = require("./constants");

const generateDefaultBoard = () => {
  return Array(rows)
    .fill()
    .map(() => Array(cols).fill(emptyColor));
};

const generateRandomLetter = () => {
  const letters = "IOTSZJL";
  return letters[Math.floor(Math.random() * letters.length)];
};

const generate2DArray = (rows, cols) => {
  const array = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(this.generateRandomLetter());
    }
    array.push(row);
  }
  return array;
};

class Game {
  constructor(id, owner) {
    this.id = id;
    this.players = new Map();

    this.owner = owner;

    this.rseed = 42;

    this.status = "waiting";
    this.slow = undefined;
  }

  init(io) {
    // this.slow = setInterval(() => {
    //   console.log(this.id, "slow loop");
    //   // this.players.forEach((p) => {
    //   //     p.board = this.generate2DArray(20, 10);
    //   // });
    // //   io.to(this.id).emit("updateBoard", {});
    // }, 5000);
  }

  start(socket, io) {
    this.rseed += 1;

    this.players.forEach((p) => {
      p.board = generateDefaultBoard();

      p.random = sfc32(0x9e3779b9, 0x243f6a88, 0xb7e15162, this.rseed);

      p.sequence = 0;
      p.piece = genPiece(p.random());
      p.next = genPiece(p.random());
      p.x = Math.floor(cols / 2);
      p.y = 0;
    });

    io.to(this.id).emit("updateBoard", { board: t3() });
    setTimeout(() => {
      io.to(this.id).emit("updateBoard", { board: t2() });
    }, 1000);
    setTimeout(() => {
      io.to(this.id).emit("updateBoard", { board: t1() });
    }, 2000);
    setTimeout(() => {
      this.players.forEach((p) => {
        p.loop = setInterval(() => {
          if (p.sequence === 0) {
            const copy = structuredClone(p.board);

            for (let i = 0; i < 4; i++) {
              for (let j = 0; j < 4; j++) {
                const dx = j + p.x;
                const dy = i + p.y;
                if (
                  p.piece.forms[p.rot][i][j] !== "." &&
                  dx >= 0 &&
                  dx >= 0 &&
                  dx < cols &&
                  dy < rows
                ) {
                  copy[dy][dx] = p.piece.id;
                }
              }
            }

            socket.emit("updateBoard", { board: copy, next: p.next });
          }

          p.sequence = (p.sequence + 1) % 50;
        }, 1000 / 10);
      });
    }, 3000);
  }
}

module.exports = { Game };
