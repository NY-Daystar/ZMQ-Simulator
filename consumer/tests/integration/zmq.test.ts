import ZmqClient from '../../src/models/ZMQClient';
import { Subscriber } from 'zeromq';

const TEST_HOST = 'localhost';
const TEST_PORT = 49152;
const TEST_CHANNEL = 'default-channel';

let client: ZmqClient;
beforeAll(() => {
	client = new ZmqClient(TEST_HOST, TEST_PORT);
	client.subscribe(TEST_CHANNEL);
});
afterAll(() => {
	client.unsubscribe();
});

describe('ZMQ client', () => {
	test('ZMQ notifier expect to instantiate socket with channel', () => {
		client.notify();
		expect(client.sock).toBeInstanceOf(Subscriber);
	});
});
