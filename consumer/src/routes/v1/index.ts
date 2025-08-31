import express, { Router } from 'express';
import zmqRoute from './zmq.route';
import docsRoute from './docs.route';

const router: Router = express.Router();

const routes = [
	{
		path: '/zmq',
		route: zmqRoute,
	},
	{
		path: '/docs',
		route: docsRoute,
	},
];

routes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
