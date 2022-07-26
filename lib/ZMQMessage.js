// TODO A DELETE
class ZMQMessage {
	constructor(error, id = '', name = '') {
		this.error = error; // ID of the error (check errors.js)
		this.gpu_id = id; // Index of GPU
		this.gpu_name = name; // Name of GPU
	}
}

module.exports = ZMQMessage;
