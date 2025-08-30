import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import config from '../config';
import ApiError from '../models/ApiError';

const errorConverter = (err: Error, _: Request, __: Response, next: NextFunction) => {
	if (!(err instanceof ApiError)) {
		err = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message, false, err.stack);
	}
	next(err);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: ApiError, _: Request, res: Response, __: NextFunction) => {
	let { statusCode, message } = err;
	if (config.env === 'production' && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
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

export { errorConverter, errorHandler };
