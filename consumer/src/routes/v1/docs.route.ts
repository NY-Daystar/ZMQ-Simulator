import path from 'path';
import express, { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../../swagger/swaggerDef';

const router: Router = express.Router();

const specs = swaggerJsdoc({
	swaggerDefinition,
	apis: ['consumer/src/swagger/*.yml', path.join(__dirname, '*.js')],
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, { explorer: true }));

export default router;
