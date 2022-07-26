const config = require('./config');
const app = require('./app');

console.info(`Environment: ${config.env}`);

app.listen(config.app_port, () => {
	console.info(`app listening on port ${config.app_port}`);
});
