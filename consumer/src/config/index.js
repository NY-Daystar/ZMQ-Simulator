const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
dotenv.config({ path: path.join(__dirname, '../../../.env'), override: true });
const { version } = require('../../../package.json');

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
		APP_PORT: Joi.number().default(3000),
		ZMQ_PORT: Joi.number().default(49152),
		ZMQ_CHANNEL: Joi.string(),
	})
	.unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
	throw new Error(`Config Consumer validation error: ${error.message}`);
}

module.exports = {
	app_version: version,
	env: envVars.NODE_ENV,
	app_port: envVars.APP_PORT,
	zmq_port: envVars.ZMQ_PORT,
	zmq_channel: envVars.ZMQ_CHANNEL,
};
