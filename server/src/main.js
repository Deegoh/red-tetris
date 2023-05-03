
import { webserv } from './webserv.js';
import { sockets } from './socket';


function create() {

	const promise = new Promise((resolve, reject) => {

		const http = require('http');
		const io = require('socket.io')(http);
		const app = http.createServer();


		webserv(app, () => {

				const stop = (callback) => {

					io.close();
					app.close(() => {
						app.unref();
					})
					loginfo(`Engine stopped.`);
					callback();
				}

				sockets(io);
				resolve({ stop });
			});
	})
	return promise;
}

create().then(() => console.log('nott yet ready to play tetris with U ...'));
