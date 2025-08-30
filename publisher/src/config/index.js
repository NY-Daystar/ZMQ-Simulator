const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
dotenv.config({ path: path.join(__dirname, '../../../.env'), override: true });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
		ZMQ_HOST: Joi.string().default('localhost'),
		ZMQ_PORT: Joi.number().default(49152),
		ZMQ_CHANNEL: Joi.string(),
		FREQUENCY: Joi.number().default(1),
		PUBLISHER_ALSO_CONSUME: Joi.bool().default(false),
	})
	.unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
	throw new Error(`Config Publisher validation error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV,
	zmq_host: envVars.ZMQ_HOST,
	zmq_port: envVars.ZMQ_PORT,
	zmq_channel: envVars.ZMQ_CHANNEL,
	frequency: envVars.FREQUENCY,
	with_consume: envVars.PUBLISHER_ALSO_CONSUME,
};
