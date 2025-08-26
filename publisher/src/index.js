const zmq = require('zeromq');
const colors = require('colors');
const { log, sleep } = require('./utils');
const { ZMQData } = require('./libs');
const config = require('./config');

/*
 * Entrypoint of program
 */
function main() {
	if (config.env === 'development') console.table(config);

	// Set ZMQ
	if (config.with_consume)
		createZmqSubscribe(config.zmq_port, config.zmq_channel).then(async (sock) => {
			for await (const [canal, msg] of sock) {
				log(`Receive on canal ${canal.toString()} : ${msg.toString()}`.green);
			}
		});

	createZmqPublisher(config.zmq_port).then(async (sock) => {
		await sleep(1000);
		let index = 0;
		while (true) {
			await sendMessage(sock, config.zmq_channel, config.frequency, ++index);
		}
	});
}

/*
 * Create ZMQ socket to send msg
 * param {port} : port socket to subscribe
 */
async function createZmqPublisher(port) {
	const sock = new zmq.Publisher();
	await sock.bind(`tcp://127.0.0.1:${port}`);

	log(colors.yellow(`Publisher bound to port ${port}`));
	return sock;
}

/*
 * Subscribe to ZMQ queue to log message
 * param {port} : port socket to subscribe
 */
async function createZmqSubscribe(port, channel) {
	const sock = new zmq.Subscriber();
	sock.connect(`tcp://127.0.0.1:${port}`);
	await sock.subscribe(channel);

	log(colors.yellow(`Subscriber connected to port ${port}`));
	return sock;
}

/**
 * Send message in the queue
 */
async function sendMessage(sock, channel, frequency, index) {
	const message = createMessage(index);
	log(colors.blue(`Content: ${JSON.stringify(message)}`));

	await sock.send([channel, JSON.stringify(message)]);
	await new Promise((resolve) => setTimeout(resolve, frequency * 1000));
}

function data_generator(index) {
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	switch (getRandomInt(3)) {
		case 0:
			return {
				index,
				type: 'global',
				id: Math.random().toString(10).slice(2).substring(0, 4),
				name: 'simulator',
			};
		case 1:
			return {
				index,
				type: 'x-value',
				id: Math.random().toString(10).slice(2).substring(0, 4),
				v1: Math.random().toString(10).slice(2).substring(0, 2),
				v2: Math.random().toString(10).slice(2).substring(0, 2),
				v3: Math.random().toString(10).slice(2).substring(0, 2),
				v4: Math.random().toString(10).slice(2).substring(0, 2),
			};
		case 2:
			return {
				index,
				type: 'part',
				id: Math.random().toString(10).slice(2).substring(0, 4),
				part1: Math.random().toString(10).slice(2).substring(0, 2),
				part2: Math.random().toString(10).slice(2).substring(0, 2),
				part3: Math.random().toString(10).slice(2).substring(0, 2),
			};
		default:
			throw new Error('value incorrect');
	}
}

/*
 * Create msg from params from type
 */
function createMessage(index) {
	const data = data_generator(index);
	return new ZMQData(data.type, data);
}

main();
