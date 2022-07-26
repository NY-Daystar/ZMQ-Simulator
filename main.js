const zmq = require('zeromq');
const colors = require('colors');
const { log } = require('./util');
const { ZMQMessage, ZMQGpu, ZMQStats, ZMQStatsTotal } = require('./lib');

const DEFAULT_FREQUENCY = 1;
const DEFAULT_INDEX = 0;
const DEFAULT_ERROR = 1;

// TODO revoir la partie scripts aussi dans package.json
// TODO pour rendre les appels dynamique
// npm run send -- --port=2000

// TODO rendre parametrable
// -le nom de la queue
//     - la frequence du message
//     - le type de message / json/string
//     - le contenu du message

// TODO lancer un html/js pour lire zmq

/*
 * Entrypoint of program
 */
function main() {
	// Get arguments
	let argv = require('minimist')(process.argv.slice(2)); // Get argv

	console.table(argv);

	let port = argv.port ? argv.port : 5555; // Default bind port 5555
	let messageType = argv.message ? argv.message : 'all';
	let index = argv.index ? argv.index : DEFAULT_INDEX; // 0
	let error_id = argv.error ? argv.error : DEFAULT_ERROR; // 0

	// Set ZMQ
	createZmqSubscribe(port);
	createZmqPublisher(port).then(async (sock) => {
		let frequency = argv.frequency ? argv.frequency : DEFAULT_FREQUENCY; // 2sec

		log(
			colors.yellow(
				`Launch ZMQ simulator on port ${port} at frequency ${frequency}sec`,
			),
		);

		// Send several message
		if (messageType == 'all') {
			sendAllMessages(sock, frequency);
		} else {
			// Send only one message
			let message = createMessage(messageType, error_id, index);
			sendZMQMessage(sock, frequency, message);
		}
	});
}

/*
 * Create ZMQ socket to send msg like pickminer-launcher
 * param {port} : port socket to subscribe
 */
async function createZmqPublisher(port) {
	const sock = new zmq.Publisher();

	await sock.bind(`tcp://127.0.0.1:${port}`);
	log(colors.yellow(`Publisher bound to port ${port}`));

	return sock;
}

/*
 * Subscribe to ZMQ queue to log message send to pickminer-launcher
 * param {port} : port socket to subscribe
 */
async function createZmqSubscribe(port) {
	const sock = new zmq.Subscriber();

	sock.connect(`tcp://127.0.0.1:${port}`);
	sock.subscribe('pickminer');
	log(colors.yellow(`Subscriber connected to port ${port}`));

	for await (const [canal, msg] of sock) {
		log(
			colors.magenta(
				`Receive on canal ${canal.toString()} : ${msg.toString()}`,
			),
		);
	}
}

/*
 * Send msg in ZMQ socket
 * param {sock} : socket to send message
 * param {frequency} : frequency of the sending (in sec)
 * param {message} : message to send
 */
async function sendZMQMessage(sock, frequency, message) {
	let i = 0;
	// infinite loop
	while (i == 0) {
		let canal = 'pickminer';
		// log(colors.blue(`Publish on canal ${canal}`));
		// log(colors.blue(`Frequency: ${frequency}sec`));
		log(colors.blue(`Content: ${JSON.stringify(message)}`));

		// Update data on message
		if (message instanceof ZMQStats) {
			message.update(frequency);
		} else if (message instanceof ZMQStatsTotal) {
			message.update();
		} else if (message instanceof ZMQGpu) {
			message.update(frequency);
		}

		await sock.send([canal, JSON.stringify(message)]);
		await new Promise((resolve) => setTimeout(resolve, frequency * 1000));
	}
}

/*
 * Create msg from params from type
 * param {type} : type of data (simple, stats, gpu or default)
 * param {id_error} : id or the error to send
 * param {index} : index of the gpu
 */
function createMessage(
	type,
	id_error,
	index,
	name = 'NVIDIA GeForce RTX 3070',
) {
	let message = null;
	switch (type) {
		case 'simple':
			log(colors.magenta('Send simple message'));
			message = new ZMQMessage(id_error, name, '1');
			break;
		case 'stats':
			log(colors.magenta('Send Stats message'));
			message = new ZMQStats(
				id_error,
				index,
				name,
				'0d 1h 32m 31s',
				20000000, // 20 MH/s
				64,
				1,
				0.706522,
				19420000, // 19.42 MH/s
			);
			break;
		case 'stats-total':
			log(colors.magenta('Send Total-Stats message'));
			message = new ZMQStatsTotal(
				20000000, // 20 MH/s
				19420000, // 19.42 MH/s
			);
			break;
		case 'gpu':
			log(colors.magenta('Send GPU message'));
			message = new ZMQGpu(
				id_error,
				index,
				name,
				59,
				93,
				75,
				1710465459,
				21911300,
				22000000,
				1816,
				2100,
				1816,
				2100,
			);
			break;
		default:
			log(colors.magenta('Send default message'));
			message = new ZMQStats(
				id_error,
				index,
				name,
				'0d 0h 0m 0s',
				0, // 20 MH/s
				0,
				0,
				0,
				0, // 19.42 MH/s
			);
	}
	return message;
}

/*
 * Send several messages
 * param {sock} : zmq socket to send messages
 * param {frequency} : frequency to send
 */
async function sendAllMessages(sock, frequency) {
	sendZMQMessage(sock, frequency, createMessage('stats-total', 0, 0));
	sendZMQMessage(sock, frequency, createMessage('stats', 0, 0));
	sendZMQMessage(sock, frequency, createMessage('gpu', 0, 0));

	// To create a delay of 5s between the two gpus
	await new Promise((resolve) => setTimeout(resolve, 5000));
	console.log(colors.grey('Send the second message'));
	sendZMQMessage(sock, frequency, createMessage('stats', 0, 1, 'NVDIA 3060'));
	sendZMQMessage(sock, frequency, createMessage('gpu', 0, 1, 'NVDIA 3060'));
}
main();
