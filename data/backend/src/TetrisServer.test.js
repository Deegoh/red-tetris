const { Server } = require('socket.io');
const { createServer } = require('node:http');
const ioc = require('socket.io-client');

const { TetrisServer } = require('./TetrisServer');

function waitFor(socket, event) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

jest.mock('./Game', () => ({
  Game: jest.fn().mockImplementation(function (...args) {
    const g = new (jest.requireActual('./Game').Game)(...args);
    g.init = jest.fn();
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
      })
    );

    clientSocket.emit('createRoom', { pseudo: 'te(#[])st' });

    const charNotif = await waitFor(clientSocket, 'notify');
    expect(charNotif).toStrictEqual(
      expect.objectContaining({
        status: 'error',
      })
    );
  });

  it('should receive room_list on connect', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });
    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'room_list'),
    ]);

    clientSocket.emit('createRoom', { pseudo: 'test2' });
    const [notif, rooms] = await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'room_list'),
    ]);

    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'success',
      })
    );
    expect(rooms.length).toBe(2);
  });

  it('should trigger room validation', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });

    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'room_list'),
    ]);

    clientSocket.emit('joinRoom', { pseudo: 'test2', room: '5' });

    const notif = await waitFor(clientSocket, 'notify');
    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'error',
      })
    );
  });

  it('should trigger connection validation', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });

    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'room_list'),
    ]);

    clientSocket.emit('connectRoom', { pseudo: 'test', room: '5' });

    const notif = await waitFor(clientSocket, 'notify');
    expect(notif).toStrictEqual(
      expect.objectContaining({
        status: 'error',
      })
    );
  });

  it('should connect to room', async () => {
    clientSocket.emit('createRoom', { pseudo: 'test' });

    await Promise.all([
      waitFor(clientSocket, 'notify'),
      waitFor(clientSocket, 'room_list'),
    ]);

    clientSocket.emit('connectRoom', { pseudo: 'test', room: '1' });

    const rooms = await waitFor(clientSocket, 'room_list');
    expect(rooms.length).toBe(1);
  });
});
