import { Subscriber } from 'zeromq';
import moment from 'moment';
import config from '../config';
import ZMQData from './ZMQData';

class ZMQClient {
	host: string;
	port: number;
	messages: ZMQData[];
	sock: Subscriber | null;
	doNotify: boolean;
	index: number;
	constructor(host: string, port: number) {
		this.host = host;
		this.port = port;
		this.messages = [] as ZMQData[];
		this.sock = null;
		this.doNotify = false;
		this.index = 0;
	}

	async subscribe(channel: string) {
		this.sock = new Subscriber();
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

			const rawData = JSON.parse(msg.toString());
			const data: ZMQData = {} as ZMQData;
			data.Guid = rawData.Guid;
			data.Type = rawData.Type;
			data.Data = JSON.stringify(rawData.Data);
			data.TimeSent = moment.unix(rawData.TimeSent).format('LLLL');

			this.messages.push(data);
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
			console.info(`new zmq message [GUID] : ${this.messages[this.messages.length - 1].Guid}`);
		}
		this.index++;
		this.doNotify = false;
	}

	/**
	 * Close socket connexion
	 */
	unsubscribe() {
		if (!this.sock) return;
		this.sock.close();
		this.sock = null;
	}
}

export default ZMQClient;
