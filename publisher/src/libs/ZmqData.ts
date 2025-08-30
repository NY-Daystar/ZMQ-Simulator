import moment from 'moment';
import { RawData } from '.';

/**
 * Zmq data to send any type of message
 */
export default class ZMQData {
	Guid: string;
	Type: string;
	Data: object;
	TimeSent: string;

	constructor(data: RawData) {
		this.Guid = Math.random().toString(16).slice(2);
		this.Type = data.Type;
		this.Data = data.Raw;
		this.TimeSent = moment().format('X');
	}
}
