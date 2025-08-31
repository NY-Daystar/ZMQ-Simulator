import config from './config';
import app from './app';

console.info(`Environment: ${config.env}`);

if (config.env === 'development') console.table(config);

app.listen(config.app_port, () => {
	console.info(`app listening on port ${config.app_port}`);
});
