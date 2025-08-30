import express, { Router } from 'express';
import { ZMQController } from '../../controllers';
import config from '../../config';

const router: Router = express.Router();

const controller: ZMQController = new ZMQController(config.zmq_host, config.zmq_port, config.zmq_channel);

router.route('/').get(controller.getZmqMessages);

export default router;

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
