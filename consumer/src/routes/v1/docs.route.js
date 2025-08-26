const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../swagger/swaggerDef');

// TODO AJOUTER MA ROUTE API
const router = express.Router();

const specs = swaggerJsdoc({
	swaggerDefinition,
	apis: ['src/swagger/*.yml', 'src/routes/v1/*.js'],
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, { explorer: true }));

module.exports = router;
