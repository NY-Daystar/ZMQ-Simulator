const path = require('path');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../swagger/swaggerDef');

const router = express.Router();

const specs = swaggerJsdoc({
	swaggerDefinition,
	apis: ['consumer/src/swagger/*.yml', path.join(__dirname, '*.js')],
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, { explorer: true }));

module.exports = router;
