import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import favicon from 'serve-favicon';
import httpStatus from 'http-status';
import routes from './routes/v1';
import { errorConverter, errorHandler } from './middlewares/error';
import { log } from './utils';
import config from './config';
import { ZMQService } from './services';
import ApiError from './models/ApiError';

const app: Express = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'static'));

// Launch services
const zmqService: ZMQService = ZMQService.getService(config.zmq_host, config.zmq_port, config.zmq_channel);

// Show every route called
if (config.env === 'development') {
	app.use((req: Request, res: Response, next: NextFunction) => {
		log(`${res.statusCode} - ${req.url}`);
		next();
	});
}

// Handle static resources
app.use(express.static(path.join(__dirname, 'static')));
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

// v1 api routes
app.use('/v1', routes);

// home page
app.use('/', (_, res) => {
	res.render('index', {
		config,
		messages: zmqService.client.messages,
	});
});

// send back a 404 error for any unknown api request
app.use((_, res, next) => {
	if (res.status(404)) next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
