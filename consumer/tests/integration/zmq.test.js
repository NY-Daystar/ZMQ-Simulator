const Client = require('../../src/models/ZMQClient');
const { Subscriber } = require('zeromq');

const TEST_PORT = 49152;
const TEST_CHANNEL = 'default-channel';

let client = null;
beforeAll(() => {
	client = new Client(TEST_PORT);
	client.subscribe(TEST_CHANNEL);
});
afterAll(() => {
	client.unsubscribe();
	client = null;
});

describe('ZMQ client', () => {
	test('ZMQ notifier expect to instantiate socket with channel', () => {
		client.notify();
		expect(client.sock).toBeInstanceOf(Subscriber);
	});
});
