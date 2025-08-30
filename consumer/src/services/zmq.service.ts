import ZMQClient from '../models/ZMQClient';
import ZMQData from '../models/ZMQData';
import { sleep } from '../utils';

class ZMQService {
	client: ZMQClient;

	constructor(host: string, port: number, channel: string) {
		this.client = new ZMQClient(host, port);
		this.activateNotification(channel);
	}

	// Singleton method
	static service?: ZMQService = undefined;
	static getService(host: string, port: number, channel: string): ZMQService {
		if (ZMQService.service !== undefined) return ZMQService.service;

		ZMQService.service = new ZMQService(host, port, channel);
		return ZMQService.service;
	}

	activateNotification = async (channel: string) => {
		this.client.subscribe(channel);
		while (true) {
			this.client.notify();
			await sleep(500);
		}
	};

	getMessages = (): ZMQData[] => {
		return this.client.messages;
	};
}

export default ZMQService;
