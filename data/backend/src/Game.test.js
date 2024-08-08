const { Game } = require('./Game');
const { rows, cols } = require('./constants');
const { t3, t2, t1 } = require('./Piece');

const { Server } = require('socket.io');
const { createServer } = require('node:http');
const ioc = require('socket.io-client');

const wsMock = {
  id: '4',
  conn: {
    remoteAddress: '4',
  },
};

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
    const testGame = new Game(32, 'testuser');
    testGame.init();

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 50);
    expect(testGame.fast).not.toBeUndefined();
  });

  it('should init player from game', () => {
    const testGame = new Game(32, 'testuser');
    testGame.init();
    testGame.rseed = 1337;

    expect(testGame.players.size).toBe(0);

    testGame.initPlayer('testplayer', wsMock);
    const testPlayer = testGame.players.get('testplayer');
    testPlayer.frame = jest.fn();

    expect(testGame.players.size).toBe(1);

    expect(testPlayer.frame).not.toHaveBeenCalled();
    jest.advanceTimersByTime(55);
    expect(testPlayer.frame).toHaveBeenCalled();
    expect(testPlayer.frame).toHaveBeenCalledTimes(1);
  });

  it('should start game', async () => {
    const testGame = new Game('32', 'testuser');
    testGame.init();

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
      expect(res[i].board).not.toBeUndefined();
      switch (i) {
        case 0:
          expect(res[i].board).toStrictEqual(t3());
          break;
        case 1:
          expect(res[i].board).toStrictEqual(t2());
          break;
        case 2:
          expect(res[i].board).toStrictEqual(t1());
          break;
      }
      expect(res[i].board.length).toBe(rows);
      expect(res[i].board[0].length).toBe(cols);
    }

    jest.advanceTimersByTime(1000);

    expect(testGame.status).toBe('playing');
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
    testPlayer2.garbageCallback('testplayer2', 3);

    expect(testPlayer.garbageToDo).toBe(0);
    expect(testPlayer2.garbageToDo).toBe(0);

    testGame.garbageType = 'full';
    testPlayer2.garbageCallback('testplayer2', 3);

    expect(testPlayer.garbageToDo).toBe(2);
    expect(testPlayer2.garbageToDo).toBe(0);
  });
});
