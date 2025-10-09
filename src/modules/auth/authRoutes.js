import { Router } from 'express';
import { AuthService } from './authService.js';
import { AuthController } from './authController.js';
import { UserService } from '../user/userService.js';
import { UserRepository } from '../user/userRespository.js';

const authRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

/**
 * @openapi
 * /auth/register:
 *   get:
 *     summary: Register a new user in application
 *     tags:
 *       - Auth
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: username
 *              email:
 *                type: string
 *                example: user@email.com
 *              password:
 *                type: string
 *                example: password
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                id:
 *                  type: string
 *                  example: 102ksd00awd02
 *                name:
 *                  type: string
 *                  example: username
 *                email:
 *                  type: string
 *                  example: user@email.com
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: '"email" must be a valid email'
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: 'email already registered'
 */
authRoutes.post('/register', (req, res, next) =>
  authController.register(req, res, next),
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: email@email.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user logged in successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: invalid credentials
 */
authRoutes.post('/login', (req, res, next) =>
  authController.login(req, res, next),
);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Logout the current user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user logged out successfully
 */
authRoutes.post('/logout', (req, res, next) =>
  authController.logout(req, res, next),
);

export { authRoutes };
