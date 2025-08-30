const express = require('express');
const { ZMQController } = require('../../controllers');
const config = require('../../config');

const router = express.Router();

const controller = new ZMQController(config.zmq_host, config.zmq_port, config.zmq_channel);

router.route('/').get(controller.getZmqMessages);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Zmq
 *   description: Zmq messages
 */

/**
 * @swagger
 * /zmq:
 *   get:
 *     summary: Get all messages
 *     description: Get all messages from zmq protocol
 *     tags: [Zmq]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Zmq'
 *       "204":
 *         $ref: '#/components/responses/NoContent'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/Internal'
 */
