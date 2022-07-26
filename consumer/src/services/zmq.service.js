const ZMQClient = require('../models/ZMQClient');
const { sleep } = require('../utils');

class ZMQService {
	constructor(port, channel) {
		this.client = new ZMQClient(port);
		this.activateNotification(channel);
	}

	// Singleton method
	static service = null;
	static getService(port, channel) {
		if (ZMQService.service !== null) return ZMQService.service;

		ZMQService.service = new ZMQService(port, channel);
		return ZMQService.service;
	}

	activateNotification = async (channel) => {
		this.client.subscribe(channel);
		while (true) {
			this.client.notify();
			await sleep(500);
		}
	};

	getMessages = () => {
		return this.client.messages;
	};
}

module.exports = ZMQService;
