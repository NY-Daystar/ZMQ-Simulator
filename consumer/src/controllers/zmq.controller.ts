import { ZMQService } from '../services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../models/ApiError';

class ZMQController {
	service: ZMQService;
	constructor(host: string, port: number, channel: string) {
		this.service = ZMQService.getService(host, port, channel);
	}

	getZmqMessages = (_: Request, res: Response) => {
		const messages = this.service.getMessages();
		if (!messages || messages.length === 0) {
			throw new ApiError(httpStatus.NO_CONTENT, 'No messages in queue');
		}
		res.send(messages);
	};
}

export default ZMQController;
