import dotenv from 'dotenv';
import path from 'path';
import Joi, { ObjectSchema } from 'joi';

dotenv.config({ path: path.join(__dirname, '../../../.env'), override: true });

const createConfiguration = () => {
	return Joi.object()
		.keys({
			NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
			ZMQ_HOST: Joi.string().default('localhost'),
			ZMQ_PORT: Joi.number().default(49152),
			ZMQ_CHANNEL: Joi.string(),
			FREQUENCY: Joi.number().default(1),
			PUBLISHER_ALSO_CONSUME: Joi.bool().default(false),
			DATA_FILE_PATH: Joi.string().default('data.json'),
		})
		.unknown();
};

const envVarsSchema: ObjectSchema = createConfiguration();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
	throw new Error(`Configuration Publisher validation error: ${error.message}`);
}

export default {
	env: envVars.NODE_ENV,
	zmq_host: envVars.ZMQ_HOST,
	zmq_port: envVars.ZMQ_PORT,
	zmq_channel: envVars.ZMQ_CHANNEL,
	data_file_path: envVars.DATA_FILE_PATH,
	frequency: envVars.FREQUENCY,
	with_consume: envVars.PUBLISHER_ALSO_CONSUME,
};
