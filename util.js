const moment = require('moment');

/** Convert seconds value into time format like this: 0d 0h 0m 0s */
exports.convertTime = (value) => {
	let sec = Number(value);
	let days = Math.floor(sec / (3600 * 24));
	let hours = Math.floor((sec % (3600 * 24)) / 3600);
	let minutes = Math.floor((sec % 3600) / 60);
	let seconds = Math.floor(sec % 60);
	return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

/** Function to show output console params with a prefix time
@param {object} params list of parameters
*/
exports.log = (...params) => {
	let sep = ' ';

	params = params.map((param) => {
		if (param instanceof Array) {
			if (param.length === 1) {
				if (typeof param === 'object')
					return '\nObject ' + JSON.stringify(param, null, 2);
				return param[0];
			} else return '\nArray ' + JSON.stringify(param, null, 2);
		} else if (typeof param === 'object') {
			return '\nObject ' + JSON.stringify(param, null, 2);
		} else return param; // type native (string, number, boolean)
	});

	console.info(
		`[${moment().format('YYYY-MM-DD HH:mm:ss [UTC]Z')}] ${params.join(
			sep,
		)}`,
	);
};
