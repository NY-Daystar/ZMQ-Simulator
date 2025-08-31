import { version } from '../../../package.json';
import config from '../config';

const swaggerDef = {
	openapi: '3.0.0',
	info: {
		title: 'ZMQ simulator',
		version,
		license: {
			name: 'GPL 3.0',
			url: 'https://github.com/NY-Daystar/ZMQ-Simulator',
		},
	},
	servers: [
		{
			url: `http://localhost:${config.app_port}/v1`,
		},
	],
};

export default swaggerDef;
