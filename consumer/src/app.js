const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const httpStatus = require('http-status');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const { log, ApiError } = require('./utils');
const config = require('./config');
const { ZMQService } = require('./services');

const app = express();

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
const zmqService = ZMQService.getService(config.zmq_port, config.zmq_channel);

// Show every route called
if (config.env === 'development') {
	app.use((req, res, next) => {
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
	if (res.status(404)) next(new ApiError(httpStatus.default.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
