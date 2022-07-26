const { ZMQData } = require('../src/libs');

describe('zmq objects', () => {
	test('Launch ZMQ object with data', () => {
		const message = 'my-zmq-message';
		const zmqData = new ZMQData('test', message);
		expect(zmqData.data).toBe(message);
	});
	test('Verify guid different ZMQ objects', () => {
		expect(new ZMQData().guid).not.toBe(new ZMQData().guid);
	});
});
