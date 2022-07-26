const httpStatus = require('http-status');
const config = require('../config');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, _, __, next) => {
	if (!(err instanceof ApiError)) {
		err = new ApiError(httpStatus.default.INTERNAL_SERVER_ERROR, null, false, err.stack);
	}
	next(err);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _, res, __) => {
	let { statusCode, message } = err;
	if (config.env === 'production' && !err.isOperational) {
		statusCode = httpStatus.default.INTERNAL_SERVER_ERROR;
		message = 'Internal error';
	}

	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		message,
		...(config.env === 'development' && { stack: err.stack }),
	};

	if (config.env === 'development') {
		res.send(`Code: ${err.statusCode}<br/>Message: ${err.message}<br/>Stacktrace: ${err.stack}`);
		return;
	}

	res.status(statusCode).send(response);
};

module.exports = {
	errorConverter,
	errorHandler,
};
