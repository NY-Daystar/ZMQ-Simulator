const moment = require('moment');

/** Function to show output console params with a prefix time
@param {object} params list of parameters
*/
exports.log = (...params) => {
	const sep = ' ';

	params = params.map((param) => {
		if (param instanceof Array) {
			if (param.length === 1) {
				if (typeof param === 'object') return `\nObject ${JSON.stringify(param, null, 2)}`;
				return param[0];
			} else return `\nArray ${JSON.stringify(param, null, 2)}`;
		} else if (typeof param === 'object') {
			return `\nObject ${JSON.stringify(param, null, 2)}`;
		} else return param; // type native (string, number, boolean)
	});

	console.info(`[${moment().format('YYYY-MM-DD HH:mm:ss [UTC]Z')}] ${params.join(sep)}`);
};

/**
 * Block code execution
 * @param {*} ms time to wait in milliseconds
 * @returns
 */
exports.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
