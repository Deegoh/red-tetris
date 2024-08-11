const { Player } = require('./Player');
const { IPiece, TPiece, tend, OPiece } = require('./Piece');
const { rows, cols } = require('./constants');
const { sfc32 } = require('./utils');

const { Server } = require('socket.io');
const { createServer } = require('node:http');
const ioc = require('socket.io-client');

jest.mock('./constants', () => ({
  ...jest.requireActual('./constants'),
  rows: 4,
  cols: 4,
}));

const wsMock = {
  id: '4',
  conn: {
    remoteAddress: '4',
  },
};

const gameMock = {
  rseed: 1337,
  garbageCallback: jest.fn(),
  endCheck: jest.fn(),
};

function waitFor(socket, event) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

describe('player tests', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);

    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = ioc(`http://localhost:${port}`);

      io.on('connection', (socket) => {
        serverSocket = socket;
      });

      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should init player', () => {
    const testPlayer = new Player('32', wsMock, gameMock);
    testPlayer.init(1337);

    expect(testPlayer.board).not.toBeUndefined();
    expect(testPlayer.board.length).toBe(rows);
    expect(testPlayer.board[0].length).toBe(cols);

    expect(testPlayer.random).not.toBeUndefined();
    expect(testPlayer.random()).toBe(3691889051);
    expect(testPlayer.random()).toBe(847267670);
    expect(testPlayer.random()).toBe(1133219677);

    expect(testPlayer.piece).not.toBeUndefined();
    expect(testPlayer.piece.id).toBe('O');
    expect(testPlayer.next).not.toBeUndefined();
    expect(testPlayer.next.id).toBe('J');
    expect(testPlayer.bag.length).toBe(12);
  });

  it('should test collision', () => {
    const testPlayer = new Player('32', wsMock, gameMock);

    testPlayer.board = testPlayer.generateDefaultBoard();
    testPlayer.piece = new IPiece();
    testPlayer.x = 0;
    testPlayer.y = 0;
    testPlayer.rot = 0;

    expect(
      testPlayer.safeMove(testPlayer.x, testPlayer.y, testPlayer.rot)
    ).toBe(true);
    expect(
      testPlayer.safeMove(testPlayer.x + 1, testPlayer.y + 1, testPlayer.rot)
    ).toBe(false);

    testPlayer.board = [
      ['T', 'T', 'T', 'T'],
      ['T', 'T', 'T', 'T'],
      ['T', 'T', 'T', 'T'],
      ['T', 'T', 'T', 'T'],
    ];

    expect(
      testPlayer.safeMove(testPlayer.x, testPlayer.y, testPlayer.rot)
    ).toBe(false);
  });

  it('should test frame sending', async () => {
    const testPlayer = new Player('32', serverSocket, gameMock);

    testPlayer.board = testPlayer.generateDefaultBoard();

    testPlayer.piece = new TPiece();
    testPlayer.next = new TPiece();
    testPlayer.x = 0;
    testPlayer.y = 0;
    testPlayer.rot = 0;
    testPlayer.sequence = 1;

    testPlayer.score = 1330;
    testPlayer.lines = 1331;
    testPlayer.level = 1332;

    testPlayer.state = 'alive';

    let boardInfos;

    testPlayer.frame('waiting');
    boardInfos = await waitFor(clientSocket, 'updateBoard');
    expect(boardInfos.boardState?.board).not.toBeUndefined();
    expect(boardInfos.boardState?.board).toStrictEqual([
      ['.', '.', '.', '.'],
      ['T', 'T', 'T', '.'],
      ['.', 'T', '.', '.'],
      ['.', '.', '.', '.'],
    ]);

    testPlayer.rot += 2;

    testPlayer.frame('waiting');
    boardInfos = await waitFor(clientSocket, 'updateBoard');
    expect(boardInfos.boardState?.board).not.toBeUndefined();
    expect(boardInfos.boardState?.board).toStrictEqual([
      ['.', 'T', '.', '.'],
      ['T', 'T', 'T', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
    ]);

    testPlayer.frame('playing');
    boardInfos = await waitFor(clientSocket, 'updateBoard');
    expect(boardInfos.boardState?.board).not.toBeUndefined();
    expect(boardInfos.boardState?.board).toStrictEqual([
      ['.', 'T', '.', '.'],
      ['T', 'T', 'T', '.'],
      ['.', '#T', '.', '.'],
      ['#T', '#T', '#T', '.'],
    ]);

    testPlayer.sequence = 0;
    testPlayer.state = 'alive';
    testPlayer.frame('playing');
    boardInfos = await waitFor(clientSocket, 'updateBoard');
    expect(testPlayer.y).toBe(1);
    expect(boardInfos.boardState?.board).not.toBeUndefined();
    expect(boardInfos.boardState?.board).toStrictEqual([
      ['.', '.', '.', '.'],
      ['.', 'T', '.', '.'],
      ['T', 'T', 'T', '.'],
      ['#T', '#T', '#T', '.'],
    ]);
  });

  it('should test tetris detection', () => {
    const testPlayer = new Player('32', wsMock, gameMock);

    testPlayer.garbageToDo = 0;

    for (let i = 0; i < rows; i++) {
      testPlayer.score = 0;
      testPlayer.lines = 9;
      testPlayer.level = 0;
      testPlayer.board = [
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
      ];
      for (let j = 0; j <= i; j++) {
        for (let k = 0; k < cols; k++) {
          testPlayer.board[rows - (j + 1)][k] = 'I';
        }
      }
      testPlayer.checkTetris();

      expect(testPlayer.board).not.toBeUndefined();
      expect(testPlayer.board).toStrictEqual([
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
      ]);
      expect(testPlayer.lines).toBe(10 + i);
      expect(testPlayer.level).toBe(1);
      expect(gameMock.garbageCallback).toHaveBeenCalled();
      expect(gameMock.garbageCallback).toHaveBeenCalledWith('32', i + 1);
    }

    testPlayer.board = [
      ['.', 'Z', '.', '.'],
      ['Z', 'Z', 'S', '.'],
      ['Z', 'T', 'S', 'S'],
      ['T', 'T', 'T', 'S'],
    ];

    testPlayer.checkTetris();

    expect(testPlayer.board).not.toBeUndefined();
    expect(testPlayer.board).toStrictEqual([
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', 'Z', '.', '.'],
      ['Z', 'Z', 'S', '.'],
    ]);
    expect(testPlayer.score).toBe(8600);
    expect(testPlayer.lines).toBe(15);
    expect(testPlayer.level).toBe(1);
  });

  it('should test game over', () => {
    const testPlayer = new Player('32', wsMock, gameMock);

    testPlayer.board = [
      ['T', 'T', 'T', '.'],
      ['L', 'T', '.', 'T'],
      ['L', '.', 'T', 'T'],
      ['L', 'L', '.', 'T'],
    ];
    testPlayer.state = 'alive';
    testPlayer.bag = [];
    testPlayer.random = sfc32(0x9e3779b9, 0x243f6a88, 0xb7e15162, 33);

    testPlayer.summonPiece();

    expect(testPlayer.state).toBe('lost');

    jest.runOnlyPendingTimers();

    expect(testPlayer.board).not.toBeUndefined();
    expect(testPlayer.board).toStrictEqual([
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['L', '.', 'T', 'T'],
      ['L', 'L', '.', 'T'],
    ]);

    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(testPlayer.board).not.toBeUndefined();
    expect(testPlayer.board).toStrictEqual([
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
    ]);

    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(gameMock.endCheck).toHaveBeenCalled();
    expect(testPlayer.board).toStrictEqual(tend());
  });

  it('should execute actions if possible', async () => {
    const testPlayer = new Player('32', serverSocket, gameMock);

    testPlayer.board = testPlayer.generateDefaultBoard();

    testPlayer.garbageToDo = 0;

    testPlayer.piece = new TPiece();
    testPlayer.next = new OPiece();
    testPlayer.bag = [];
    testPlayer.random = sfc32(0x9e3779b9, 0x243f6a88, 0xb7e15162, 33);
    testPlayer.x = 0;
    testPlayer.y = 0;
    testPlayer.rot = 0;

    testPlayer.score = 0;
    testPlayer.lines = 0;
    testPlayer.level = 0;

    testPlayer.state = 'lost';
    testPlayer.action('down');
    expect(testPlayer.x).toBe(0);
    expect(testPlayer.y).toBe(0);
    // [
    //   ['T','T','T','.'],
    //   ['.','T','.','.'],
    //   ['.','.','.','.'],
    //   ['.','.','.','.'],
    // ]

    testPlayer.state = 'alive';
    testPlayer.action('right');
    expect(testPlayer.x).toBe(1);
    expect(testPlayer.y).toBe(0);

    testPlayer.action('up');
    expect(testPlayer.rot).toBe(1);
    // [
    //   [ '.', 'T', '.', '.' ],
    //   [ 'T', 'T', '.', '.' ],
    //   [ '.', 'T', '.', '.' ],
    //   [ '.', '.', '.', '.' ]
    // ]

    testPlayer.action('right');
    testPlayer.action('right');
    testPlayer.action('right');
    testPlayer.action('right');
    expect(testPlayer.x).toBe(2);
    expect(testPlayer.y).toBe(0);

    testPlayer.action('up');
    // [
    //   [ '.', '.', 'T', '.' ],
    //   [ '.', 'T', 'T', 'T' ],
    //   [ '.', '.', '.', '.' ],
    //   [ '.', '.', '.', '.' ]
    // ]

    testPlayer.action('up');
    expect(testPlayer.rot).toBe(3);

    testPlayer.action('left');
    testPlayer.action('left');
    testPlayer.action('left');
    testPlayer.action('left');
    expect(testPlayer.x).toBe(-1);
    expect(testPlayer.y).toBe(0);

    testPlayer.action('up');
    expect(testPlayer.rot).toBe(0);

    testPlayer.action('down', true);
    expect(testPlayer.x).toBe(0);
    expect(testPlayer.y).toBe(1);
    expect(testPlayer.score).toBe(1);
    // [
    //   [ '.', '.', '.', '.' ],
    //   [ '.', '.', '.', '.' ],
    //   [ 'T', 'T', 'T', '.' ],
    //   [ '.', 'T', '.', '.' ]
    // ]

    testPlayer.action('down');
    expect(testPlayer.board).toStrictEqual([
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['T', 'T', 'T', '.'],
      ['.', 'T', '.', '.'],
    ]);
    expect(gameMock.garbageCallback).toHaveBeenCalled();
    expect(gameMock.garbageCallback).toHaveBeenCalledWith('32', 0);

    // [
    //   [ '.', 'O', 'O', '.' ],
    //   [ '.', '.', '.', '.' ],
    //   [ '.', '.', '.', '.' ],
    //   [ '.', '.', '.', '.' ]
    // ]
    testPlayer.score = 0;
    testPlayer.board = testPlayer.generateDefaultBoard();
    testPlayer.action('space', true);
    expect(testPlayer.board).toStrictEqual([
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', 'O', 'O', '.'],
      ['.', 'O', 'O', '.'],
    ]);
    expect(testPlayer.score).toBe(6);

    // testPlayer.sequence = 1;
    // testPlayer.frame('waiting');
    // console.log((await waitFor(clientSocket, 'updateBoard')).board);
  });

  it('should test garbage summoning', async () => {
    const testPlayer = new Player('32', serverSocket, gameMock);
    testPlayer.gameover = jest.fn();

    testPlayer.board = [
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', 'T', '.', '.'],
      ['T', 'T', 'T', '.'],
    ];
    testPlayer.game.garbageType = 'full';
    testPlayer.garbageToDo = 2;
    testPlayer.summonGarbage();
    jest.runOnlyPendingTimers();

    expect(testPlayer.board).not.toBeUndefined();
    expect(testPlayer.board).toStrictEqual([
      ['.', 'T', '.', '.'],
      ['T', 'T', 'T', '.'],
      ['U', 'U', 'U', 'U'],
      ['U', 'U', 'U', 'U'],
    ]);

    testPlayer.board = [
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', 'T', '.', '.'],
      ['T', 'T', 'T', '.'],
    ];
    testPlayer.game.garbageType = 'hole';
    testPlayer.garbageToDo = 2;
    testPlayer.summonGarbage();
    jest.runOnlyPendingTimers();

    expect(testPlayer.board).not.toBeUndefined();
    expect(testPlayer.board).toEqual([
      ['.', 'T', '.', '.'],
      ['T', 'T', 'T', '.'],
      expect.arrayContaining(['.', 'W']),
      expect.arrayContaining(['.', 'W']),
    ]);

    testPlayer.board = [
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', 'T', '.', '.'],
      ['T', 'T', 'T', '.'],
    ];
    testPlayer.game.garbageType = 'hole';
    testPlayer.garbageToDo = 4;
    testPlayer.summonGarbage();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();

    expect(testPlayer.gameover).toHaveBeenCalled();
  });
});
