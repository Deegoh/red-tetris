const { createServer } = require("node:http");
const { Server } = require("socket.io");
const ioc = require("socket.io-client");

const { setSocketListeners } = require("./socket");


function waitFor(socket, event) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

describe("my awesome project", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {

    const httpServer = createServer();
    io = new Server(httpServer);

    httpServer.listen(() => {

      const port = httpServer.address().port;
      clientSocket = ioc(`http://localhost:${port}`);

      io.on("connection", (socket) => {
        serverSocket = socket;
        setSocketListeners(socket, io);
      });

      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });


  it("ping should be received", () => {

    clientSocket.emit("ping");
    return waitFor(serverSocket, "ping");
  });

  it("pong should be received", () => {

    clientSocket.emit("ping");
    return waitFor(clientSocket, "pong");
  });


  it("should receive room_list on connect", async () => {

    clientSocket.emit("createRoom", { roomname: 'test' });

    const [notif, rooms] = await Promise.all([
      waitFor(clientSocket, "notify"),
      waitFor(clientSocket, "room_list")
    ]);

    expect(notif).toStrictEqual({ status: 'success', text: 'created' })
    expect(rooms).toContain('test')
  });
});