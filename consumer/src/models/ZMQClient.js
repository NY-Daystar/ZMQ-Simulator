const zmq = require('zeromq');
const moment = require('moment');
const config = require('../config');

class ZMQClient {
	constructor(host, port) {
		this.host = host;
		this.port = port;
		this.messages = [];
		this.sock = null;
		this.doNotify = false;
		this.index = 0;
	}

	async subscribe(channel) {
		this.sock = new zmq.Subscriber();
		this.sock.connect(`tcp://${this.host}:${this.port}`);
		if (channel === null) {
			this.sock.subscribe();
		} else {
			this.sock.subscribe(channel);
		}
		console.info(`Subscriber connected to host ${this.host} and port ${this.port} channel: ${channel}`);

		for await (const [msg1, msg2] of this.sock) {
			let msg = null;
			if (msg2 !== undefined) {
				msg = msg2;
			} else {
				msg = msg1;
			}
			const data = JSON.parse(msg);
			this.messages.push({
				guid: data.guid,
				type: data.type,
				data: JSON.stringify(data.data),
				timeSent: moment.unix(data.timeSent).format('LLLL'),
			});
			this.doNotify = true;
		}
	}

	/**
	 * Show data if new message appear
	 */
	notify() {
		if (this.sock == null) return;
		if (this.messages.length === 0) return;
		if (!this.doNotify) return;
		if (this.index > this.messages.length) {
			return;
		}

		if (config.env === 'development') {
			console.info(`new zmq message [GUID] : ${this.messages[this.messages.length - 1].guid}`);
		}
		this.index++;
		this.doNotify = false;
	}

	/**
	 * Close socket connexion
	 */
	unsubscribe() {
		this.sock.close();
		this.sock = null;
	}
}

module.exports = ZMQClient;
