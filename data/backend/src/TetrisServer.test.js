const { Server } = require('socket.io');
const { createServer } = require('node:http');
const ioc = require('socket.io-client');

const { TetrisServer } = require('./TetrisServer');

function waitFor(socket, event) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}
jest.mock('./dbConnector', () => ({
  getClient: jest.fn(() => {
    return {
      connect: () =>
        new Promise((resolve, reject) => {
          resolve();
        }),
      query: () =>
        new Promise((resolve, reject) => {
          resolve({ rows: [{}, {}] });
        }),
      end: jest.fn(),
    };
  }),
}));

jest.mock('./Game', () => ({
  Game: jest.fn().mockImplementation(function (...args) {
    const g = new (jest.requireActual('./Game').Game)(...args);
    g.init = jest.fn();
    g.start = jest.fn();
    g.status = 'waiting';
    return g;
  }),
}));

describe('socket test', () => {
  let io, serverSocket, clientSocket;
  let tetrisServer;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);

    tetrisServer = new TetrisServer();

    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = ioc(`http://localhost:${port}`);

      io.on('connection', (socket) => {
        serverSocket = socket;
        tetrisServer.setSocketListeners(socket, io);
      });

      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });

  beforeEach(() => {
    tetrisServer.init();
    serverSocket.conn.remoteAddress = 'myip';
  });

  it('ping should be received', () => {
    clientSocket.emit('ping');
    return waitFor(serverSocket, 'ping');
  });

  it('pong should be received', () => {
    clientSocket.emit('ping');
    return waitFor(clientSocket, 'pong');
  });

  it('should trigger pseudo validation', async () => {
    clientSocket.emit('createRoom', { pseudo: 'tt' });

    const shortNotif = await waitFor(clientSocket, 'notify');
    expect(shortNotif).toStrictEqual(
      expect.objectContaining({
        status: 'error',
        code: 'PSEUDO_LENGTH',
      })
    );

    clientSocket.emit('createRoom', { pseudo: 'te(#[])st' });

    const charNotif = await waitFor(clientSocket, 'notify');
    expect(charNotif).toStrictEqual(
      expect.objectContaining({
        status: 'error',
        code: 'SPECIALS_CHARS',
      })
    );
  });

  it('should receive leaderboard on demand', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });
    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    clientSocket.emit('getLeaderboard');
    const leaderboard = await waitFor(clientSocket, 'leaderboardRes');

    expect(leaderboard.length).toBe(2);
  });

  it('should receive room list on connect', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });
    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    clientSocket.emit('createRoom', { pseudo: 'test2' });
    const [notif, rooms] = await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'success',
        code: 'ROOM_CREATED',
      })
    );
    expect(rooms.length).toBe(2);
  });

  it('should trigger join room validation', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });

    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    clientSocket.emit('joinRoom', { pseudo: 'test2', room: '5' });
    const notif = await waitFor(clientSocket, 'notify');
    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'error',
        code: 'ROOM_404',
      })
    );

    clientSocket.emit('joinRoom', { pseudo: 'test', room: '1' });
    const notif2 = await waitFor(clientSocket, 'notify');
    expect(notif2).toStrictEqual(
      expect.objectContaining({
        status: 'info',
        code: 'ALREADY_SUBSCRIBED',
      })
    );

    serverSocket.conn.remoteAddress = 'spoofIP';
    clientSocket.emit('joinRoom', { pseudo: 'test', room: '1' });
    const notif3 = await waitFor(clientSocket, 'notify');
    expect(notif3).toStrictEqual(
      expect.objectContaining({
        status: 'error',
        code: 'USERNAME_TAKEN',
      })
    );
  });

  it('should join room', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });

    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    clientSocket.emit('joinRoom', { pseudo: 'test2', room: '1' });
    const notif = await waitFor(clientSocket, 'notify');
    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'success',
        code: 'ROOM_JOINED',
      })
    );
  });

  it('should connect to room', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });

    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    clientSocket.emit('connectRoom', { pseudo: 'test', room: '1' });
    const [notif, rooms] = await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);
    // const rooms = await waitFor(clientSocket, 'roomList');
    expect(rooms.length).toBe(1);
    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'success',
        code: 'ROOM_CONNECTED',
      })
    );

    clientSocket.emit('connectRoom', { pseudo: 'test2', room: '1' });
    const notif2 = await waitFor(clientSocket, 'notify');
    expect(notif2).toStrictEqual(
      expect.objectContaining({
        status: 'success',
        code: 'ROOM_CONNECTED',
      })
    );
  });

  it('should trigger connection validation', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });

    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    clientSocket.emit('connectRoom', { pseudo: 'test', room: '1' });
    await waitFor(clientSocket, 'roomList');

    serverSocket.id = 'spoofIdentif';
    clientSocket.emit('connectRoom', { pseudo: 'test', room: '1' });
    const notif2 = await waitFor(clientSocket, 'notify');
    expect(notif2).toStrictEqual(
      expect.objectContaining({
        status: 'warning',
        code: 'MOVE_HANDLE',
      })
    );

    serverSocket.conn.remoteAddress = 'spoofIP';
    clientSocket.emit('connectRoom', { pseudo: 'test', room: '1' });
    const notif3 = await waitFor(clientSocket, 'notify');
    expect(notif3).toStrictEqual(
      expect.objectContaining({
        status: 'error',
        code: 'USERNAME_TAKEN',
      })
    );
  });

  it('should trigger start game validation', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });

    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    clientSocket.emit('connectRoom', { pseudo: 'test2', room: '1' });
    await waitFor(clientSocket, 'roomList');

    clientSocket.emit('startGame');
    const notif = await waitFor(clientSocket, 'notify');
    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'error',
        code: 'NOT_OWNER',
      })
    );
  });

  it('should start game', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });

    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    clientSocket.emit('connectRoom', { pseudo: 'test', room: '1' });
    await waitFor(clientSocket, 'roomList');

    clientSocket.emit('startGame');
    const notif = await waitFor(clientSocket, 'notify');
    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'success',
        code: 'STARTING_GAME',
      })
    );

    clientSocket.emit('startGame');
    await new Promise((r) => setTimeout(r, 200));
  });

  it('should send game actions', async () => {
    jest.mock('./Game', () => ({
      Game: jest.fn().mockImplementation(function (...args) {
        const g = new (jest.requireActual('./Game').Game)(...args);
        g.init = jest.fn();
        g.start = jest.fn();
        g.status = 'playing';
        return g;
      }),
    }));

    clientSocket.emit('gameAction', { action: 'left' });
    const notif = await waitFor(clientSocket, 'notify');
    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'error',
        code: 'NOT_REGISTERED',
      })
    );

    clientSocket.emit('createRoom', { pseudo: 'test' });
    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'roomList'),
    ]);

    clientSocket.emit('connectRoom', { pseudo: 'test', room: '1' });
    await waitFor(clientSocket, 'roomList');

    clientSocket.emit('gameAction', { action: 'left' });
    clientSocket.emit('gameAction', { action: 'down' });
    await new Promise((r) => setTimeout(r, 200));
  }, 20000);
});
