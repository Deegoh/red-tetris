const { rows, cols } = require("./constants");

class Player {
  constructor(pseudo, socketId, addr) {
    this.pseudo = pseudo;
    this.socketId = socketId;
    this.addr = addr;

    this.state = "normal";

    this.board = undefined;

    this.loop = undefined;
    this.random = undefined;

    this.sequence = 0;
    this.piece = undefined;
    this.next = undefined;
    this.x = -1;
    this.y = -1;
    this.rot = 0;
  }

  collision() {}

  action(act) {
    switch (act) {
      case "up":
        break;

      case "left":
        if (this.x > 0) {
          this.x -= 1;
        }
        break;

      case "down":
        break;

      case "right":
        if (this.x < cols - 4) {
          this.x += 1;
        }
        break;

      case "space":
        break;
    }
  }
}

module.exports = { Player };
