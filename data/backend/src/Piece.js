class Piece {
  constructor(forms) {
    this.id = ".";
    this.forms = forms;
  }
}

class OPiece extends Piece {
  constructor() {
    const forms = [
      [
        [".", "O", "O", "."],
        [".", "O", "O", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
      ],
    ];
    super(forms);

    this.id = "O";
  }
}

class TPiece extends Piece {
  constructor() {
    const forms = [
      [
        [".", ".", ".", "."],
        ["T", "T", "T", "."],
        [".", "T", ".", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", "T", ".", "."],
        ["T", "T", ".", "."],
        [".", "T", ".", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", "T", ".", "."],
        ["T", "T", "T", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", "T", ".", "."],
        [".", "T", "T", "."],
        [".", "T", ".", "."],
        [".", ".", ".", "."],
      ],
    ];
    super(forms);

    this.id = "T";
  }
}

class IPiece extends Piece {
  constructor() {
    const forms = [
      [
        [".", "I", ".", "."],
        [".", "I", ".", "."],
        [".", "I", ".", "."],
        [".", "I", ".", "."],
      ],
      [
        [".", ".", ".", "."],
        ["I", "I", "I", "I"],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
      ],
    ];
    super(forms);

    this.id = "I";
  }
}

class JPiece extends Piece {
  constructor() {
    const forms = [
      [
        ["J", ".", ".", "."],
        ["J", "J", "J", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", "J", "J", "."],
        [".", "J", ".", "."],
        [".", "J", ".", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", ".", ".", "."],
        ["J", "J", "J", "."],
        [".", ".", "J", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", "J", ".", "."],
        [".", "J", ".", "."],
        ["J", "J", ".", "."],
        [".", ".", ".", "."],
      ],
    ];
    super(forms);

    this.id = "J";
  }
}

class LPiece extends Piece {
  constructor() {
    const forms = [
      [
        [".", ".", ".", "."],
        ["L", "L", "L", "."],
        ["L", ".", ".", "."],
        [".", ".", ".", "."],
      ],
      [
        ["L", "L", ".", "."],
        [".", "L", ".", "."],
        [".", "L", ".", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", ".", "L", "."],
        ["L", "L", "L", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", "L", ".", "."],
        [".", "L", ".", "."],
        [".", "L", "L", "."],
        [".", ".", ".", "."],
      ],
    ];
    super(forms);

    this.id = "L";
  }
}

class SPiece extends Piece {
  constructor() {
    const forms = [
      [
        [".", ".", ".", "."],
        [".", "S", "S", "."],
        ["S", "S", ".", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", "S", ".", "."],
        [".", "S", "S", "."],
        [".", ".", "S", "."],
        [".", ".", ".", "."],
      ],
    ];
    super(forms);

    this.id = "S";
  }
}

class ZPiece extends Piece {
  constructor() {
    const forms = [
      [
        [".", ".", ".", "."],
        ["Z", "Z", ".", "."],
        [".", "Z", "Z", "."],
        [".", ".", ".", "."],
      ],
      [
        [".", ".", "Z", "."],
        [".", "Z", "Z", "."],
        [".", "Z", ".", "."],
        [".", ".", ".", "."],
      ],
    ];
    super(forms);

    this.id = "Z";
  }
}

const pieces = [OPiece, IPiece, TPiece, JPiece, LPiece, SPiece, ZPiece];

function genBag(rng) {
  return pieces.map((p) => {
    return new p();
  });
}

function t3() {
  return [
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "T", "T", "T", "T", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "T", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "T", ".", ".", "."],
    [".", ".", ".", ".", "T", "T", "T", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", "T", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "T", ".", ".", "."],
    [".", ".", ".", "T", "T", "T", "T", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ];
}

function t2() {
  return [
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "J", "J", "J", "J", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "J", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "J", ".", ".", "."],
    [".", ".", ".", "J", "J", "J", "J", ".", ".", "."],

    [".", ".", ".", "J", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "J", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "J", "J", "J", "J", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ];
}

function t1() {
  return [
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "S", "S", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "S", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "S", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "S", ".", ".", ".", "."],

    [".", ".", ".", ".", ".", "S", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "S", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "S", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ];
}

function tend() {
  return [
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],

    [".", ".", ".", "T", "T", "T", "T", ".", ".", "."],
    [".", ".", ".", "T", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "T", "T", "T", ".", ".", ".", "."],
    [".", ".", ".", "T", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "T", "T", "T", "T", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],

    [".", ".", ".", "T", ".", ".", "T", ".", ".", "."],
    [".", ".", ".", "T", "T", ".", "T", ".", ".", "."],
    [".", ".", ".", "T", "T", ".", "T", ".", ".", "."],
    [".", ".", ".", "T", ".", "T", "T", ".", ".", "."],
    [".", ".", ".", "T", ".", "T", "T", ".", ".", "."],
    [".", ".", ".", "T", ".", ".", "T", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],

    [".", ".", ".", "T", "T", "T", ".", ".", ".", "."],
    [".", ".", ".", "T", ".", ".", "T", ".", ".", "."],
    [".", ".", ".", "T", ".", ".", "T", ".", ".", "."],
    [".", ".", ".", "T", ".", ".", "T", ".", ".", "."],
    [".", ".", ".", "T", "T", "T", ".", ".", ".", "."],

    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  ];
}

module.exports = { genBag, t3, t2, t1, tend };