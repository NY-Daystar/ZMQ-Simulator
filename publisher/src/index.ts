import { Publisher, Subscriber } from 'zeromq';
import { blue, green, yellow } from 'colors';
import config from './config';
import { log, sleep, isFileExists, readFile } from './utils';
import { RawData, ZMQData } from './libs';

/*
 * Entrypoint of program
 */
function main() {
	if (config.env === 'development') console.table(config);

	// Set ZMQ
	if (config.with_consume)
		createZmqSubscribe(config.zmq_host, config.zmq_port, config.zmq_channel).then(async (sock: Subscriber) => {
			for await (const [canal, msg] of sock) {
				log(`Receive on canal ${canal.toString()} : ${green(msg.toString())}`);
			}
		});
	createZmqPublisher(config.zmq_port)
		.then(async (sock: Publisher) => {
			await sleep(1000);
			let index = 0;
			while (true) {
				await sendMessage(sock, config.zmq_channel, config.frequency, ++index);
			}
		})
		.catch((e) => {
			console.error('Error creating publisher', e);
		});
}

/*
 * Create ZMQ socket to send msg
 * param {port} : port socket to subscribe
 */
async function createZmqPublisher(port: number): Promise<Publisher> {
	const sock: Publisher = new Publisher();
	await sock.bind(`tcp://*:${port}`);
	log(`Publisher bound to every host (tcp://*) to port ${yellow(port.toString())}`);
	return sock;
}

/*
 * Subscribe to ZMQ queue to log message
 * param {port} : port socket to subscribe
 */
async function createZmqSubscribe(host: string, port: number, channel: string): Promise<Subscriber> {
	const sock: Subscriber = new Subscriber();
	sock.connect(`tcp://${host}:${port}`);
	sock.subscribe(channel);

	log(`Subscriber connected to host ${yellow(host)} and port ${yellow(port.toString())} channel: ${yellow(channel)}`);
	return sock;
}

/**
 * Send message in the queue
 */
async function sendMessage(sock: Publisher, channel: string, frequency: number, index: number): Promise<void> {
	const message: ZMQData = createMessage(index);
	log(blue(`Content: ${JSON.stringify(message)}`));
	await sock.send([channel, JSON.stringify(message)]);
	await new Promise((resolve) => setTimeout(resolve, frequency * 1000));
}

function data_generator(index: number): RawData {
	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	const data: RawData = {} as RawData;
	data.Index = index;
	switch (getRandomInt(3)) {
		case 0:
			data.Type = 'global';
			data.Raw = { name: 'simulator' };
			break;
		case 1:
			data.Type = 'x-value';
			data.Raw = {
				v1: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				v2: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				v3: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				v4: Number(Math.random().toString(10).slice(2).substring(0, 2)),
			};
			break;
		case 2:
			data.Type = 'part';
			data.Raw = {
				Part1: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				Part2: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				Part3: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				Part4: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				Part5: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				Part6: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				Part7: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				Part8: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				Part9: Number(Math.random().toString(10).slice(2).substring(0, 2)),
				PartX: Number(Math.random().toString(10).slice(2).substring(0, 2)),
			};
			break;
		default:
			throw new Error('value incorrect');
	}
	return data;
}

/*
 * Create msg from params from type
 */
function createMessage(index: number): ZMQData {
	let data: RawData = {} as RawData;

	if (!isFileExists(config.data_file_path)) {
		log(`Warn: file ${config.data_file_path} didn't exist`.yellow);
		log('Generate random data');
		data = data_generator(index);
	} else {
		data.Type = 'file';
		data.Raw = JSON.parse(readFile(config.data_file_path));
	}

	return new ZMQData(data);
}

main();
