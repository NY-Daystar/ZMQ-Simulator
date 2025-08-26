const moment = require('moment');
/**
 * Zmq data to send any type of message
 */
module.exports = class ZMQData {
	constructor(type, data, time = moment().format('X')) {
		this.guid = Math.random().toString(16).slice(2);
		this.type = type;
		this.data = data;
		this.timeSent = time;
	}
};
