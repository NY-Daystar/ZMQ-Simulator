const { version } = require('../../../package.json');
const config = require('../config');

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

module.exports = swaggerDef;
