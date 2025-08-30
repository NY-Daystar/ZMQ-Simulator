const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { ZMQService } = require('../services');

class ZMQController {
	constructor(host, port, channel) {
		this.service = ZMQService.getService(host, port, channel);
	}

	getZmqMessages = async (_, res) => {
		const messages = await this.service.getMessages();
		if (!messages || messages.length === 0) {
			throw new ApiError(httpStatus.default.NO_CONTENT, 'No messages in queue');
		}
		res.send(messages);
	};
}

module.exports = ZMQController;
