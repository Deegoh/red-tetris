const { Game } = require('./Game');
const { rows, cols } = require('./constants');
const { t3, t2, t1 } = require('./Piece');

const { Server } = require('socket.io');
const { createServer } = require('node:http');
const ioc = require('socket.io-client');

jest.mock('./dbConnector', () => ({
  getClient: jest.fn(() => {
    return {
      connect: jest.fn(() => Promise.resolve()),
      query: () =>
        new Promise((resolve, reject) => {
          resolve({ rows: [{}, {}] });
        }),
      end: jest.fn(),
    };
  }),
}));

const wsMock = {
  id: '4',
  conn: {
    remoteAddress: '4',
  },
  emit: jest.fn(),
};

jest.mock('./Player', () => ({
  Player: jest.fn().mockImplementation(function (...args) {
    const p = new (jest.requireActual('./Player').Player)(...args);
    p.setSocket = jest.fn();
    return p;
  }),
}));

function waitFor(socket, event) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

describe('game tests', () => {
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
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should init game', () => {
    const testGame = new Game(32, 'testuser', {
      garbageType: 'hole',
      bagType: 0,
      hold: '1',
      preview: '1',
      difficulty: 15,
    });
    testGame.init();

    expect(setInterval).toHaveBeenCalledTimes(2);
    expect(setInterval).toHaveBeenNthCalledWith(1, expect.any(Function), 50);
    expect(setInterval).toHaveBeenNthCalledWith(2, expect.any(Function), 1500);
    expect(testGame.fast).not.toBeUndefined();
    expect(testGame.slow).not.toBeUndefined();
  });

  it('should init player from game', () => {
    const testGame = new Game('32', 'testuser');
    const fakeSdns = new Map();
    fakeSdns.set(wsMock.id, {
      pseudo: 'testplayer',
      roomname: '32',
    });
    testGame.init(undefined, fakeSdns, new Map());
    testGame.rseed = 1337;

    expect(testGame.players.size).toBe(0);

    testGame.initPlayer('testplayer', wsMock);
    const testPlayer = testGame.players.get('testplayer');
    testPlayer.state = 'spectate';
    testPlayer.frame = jest.fn();

    expect(testGame.players.size).toBe(1);

    expect(testPlayer.frame).not.toHaveBeenCalled();

    jest.advanceTimersByTime(55);
    expect(testPlayer.frame).not.toHaveBeenCalled();

    testPlayer.state = 'alive';
    jest.advanceTimersByTime(55);
    expect(testPlayer.frame).toHaveBeenCalled();
    expect(testPlayer.frame).toHaveBeenCalledTimes(1);
  });

  it('should start game', async () => {
    const testGame = new Game('32', 'testuser');
    testGame.init(io, new Map(), new Map());

    serverSocket.join('32');

    testGame.start(io);
    expect(testGame.status).toBe('launching');

    const res = [];

    const req3 = waitFor(clientSocket, 'updateBoard');
    jest.advanceTimersByTime(500);
    res.push(await req3);

    const req2 = waitFor(clientSocket, 'updateBoard');
    jest.advanceTimersByTime(1000);
    res.push(await req2);

    const req1 = waitFor(clientSocket, 'updateBoard');
    jest.advanceTimersByTime(1000);
    res.push(await req1);

    for (let i = 0; i < res.length; i++) {
      // expect(res[i]).not.toBeUndefined();
      // expect(res[i].board).not.toBeUndefined();
      // expect(res[i].board.length).toBe(rows);
      // expect(res[i].board[0].length).toBe(cols);

      expect(res[i]).not.toBeUndefined();
      expect(res[i].boardState?.board).not.toBeUndefined();
      switch (i) {
        case 0:
          expect(res[i].boardState?.board).toStrictEqual(t3());
          break;
        case 1:
          expect(res[i].boardState?.board).toStrictEqual(t2());
          break;
        case 2:
          expect(res[i].boardState?.board).toStrictEqual(t1());
          break;
      }
      expect(res[i].boardState?.board.length).toBe(rows);
      expect(res[i].boardState?.board[0].length).toBe(cols);
    }

    jest.advanceTimersByTime(1000);

    expect(testGame.status).toBe('playing');

    testGame.initPlayer('testplayer', wsMock);
    const testPlayer = testGame.players.get('testplayer');

    expect(testPlayer.state).toBe('spectate');
  });

  it('should test players timeout in game', () => {
    const fakeSdns = new Map();
    const fakeGames = new Map();

    const testGame = new Game('32', 'testplayer');
    fakeGames.set('32', testGame);

    testGame.init(io, fakeSdns, fakeGames);

    testGame.initPlayer('testplayer', wsMock);
    fakeSdns.set('4', { pseudo: 'testplayer', roomname: '32' });
    testGame.players.get('testplayer').pseudo = 'testplayer';
    testGame.players.get('testplayer').socketId = '4';
    testGame.players.get('testplayer').timeout = 0;

    testGame.initPlayer('testplayer2', wsMock);
    fakeSdns.set('5', { pseudo: 'testplayer2', roomname: '32' });
    testGame.players.get('testplayer2').pseudo = 'testplayer2';
    testGame.players.get('testplayer2').socketId = '5';
    testGame.players.get('testplayer2').timeout = 0;

    jest.advanceTimersByTime(15000);
    expect(testGame.owner).toBe('testplayer');

    fakeSdns.set('4', { pseudo: 'testplayer', roomname: '42' });
    jest.advanceTimersByTime(15000);
    expect(testGame.owner).toBe('testplayer2');

    fakeSdns.set('5', { pseudo: 'testplayer2', roomname: '42' });
    expect(fakeGames.size).toBe(1);
    jest.advanceTimersByTime(18000);
    expect(fakeGames.size).toBe(0);
  });

  it('should test game end check', () => {
    const testGame = new Game('32', 'testplayer');
    const fakeSdns = new Map();
    const fakeGames = new Map();

    testGame.init(io, fakeSdns, fakeGames);

    testGame.initPlayer('testplayer', wsMock);
    testGame.players.get('testplayer').pseudo = 'testplayer';
    testGame.players.get('testplayer').state = 'alive';
    testGame.players.get('testplayer').drawScreen = jest.fn();

    testGame.initPlayer('testplayer2', wsMock);
    testGame.players.get('testplayer2').pseudo = 'testplayer2';
    testGame.players.get('testplayer2').state = 'alive';
    testGame.endCheck();

    testGame.players.get('testplayer2').state = 'lost';
    testGame.endCheck();

    jest.runOnlyPendingTimers();
    expect(testGame.players.get('testplayer').drawScreen).toHaveBeenCalled();
    expect(testGame.status).toBe('waiting');
  });

  it('should give garbage to players', () => {
    const testGame = new Game(32, 'testuser');
    testGame.init();

    testGame.initPlayer('testplayer', wsMock);
    testGame.initPlayer('testplayer2', wsMock);

    const testPlayer = testGame.players.get('testplayer');
    const testPlayer2 = testGame.players.get('testplayer2');

    testPlayer.state = 'alive';
    testPlayer2.state = 'alive';
    testPlayer.garbageToDo = 0;
    testPlayer2.garbageToDo = 0;

    testGame.garbageType = 'no';
    testPlayer2.game.garbageCallback('testplayer2', 3);

    expect(testPlayer.garbageToDo).toBe(0);
    expect(testPlayer2.garbageToDo).toBe(0);

    testGame.garbageType = 'full';
    testPlayer2.game.garbageCallback('testplayer2', 3);

    expect(testPlayer.garbageToDo).toBe(2);
    expect(testPlayer2.garbageToDo).toBe(0);
  });
});
