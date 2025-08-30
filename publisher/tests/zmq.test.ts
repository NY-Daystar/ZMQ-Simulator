import { RawData, ZMQData } from '../src/libs';

describe('zmq objects', () => {
	const raw: RawData = { Type: 'my-zmq-message' } as RawData;
	test('Launch ZMQ object with data', () => {
		const zmqData: ZMQData = new ZMQData(raw);
		const expected = raw.Type;
		expect(zmqData.Type).toBe(expected);
	});
	test('Verify guid different ZMQ objects', () => {
		expect(new ZMQData(raw).Guid).not.toBe(new ZMQData(raw).Guid);
	});
});
