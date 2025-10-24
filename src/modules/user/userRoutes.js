import { Router } from 'express';
import { UserController } from './userController.js';
import { UserRepository } from './userRespository.js';
import { UserService } from './userService.js';
import multer from 'multer';
import { fileFilter, storage } from '../../config/multer.js';
import { S3ImageProvider } from './providers/imageProvider.js';

const upload = multer({ storage, fileFilter });
const userRoutes = Router();

const userRepository = new UserRepository();
const imageProvider = new S3ImageProvider();
const userService = new UserService(userRepository, imageProvider);
const userController = new UserController(userService);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve the currently logged-in user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 68e83a15880a75367e3dbe55
 *                 name:
 *                   type: string
 *                   example: user
 *                 email:
 *                   type: string
 *                   example: user@email.com
 *                 profileUrl:
 *                   type: string
 *                   example: https://url.image.com/image
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-10-09T22:41:25.449Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-10-09T22:41:25.449Z
 *       401:
 *         description: Unauthorized – No token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: no token provided
 */
userRoutes.get('/', (req, res, next) => userController.show(req, res, next));

/**
 * @openapi
 * /users:
 *   patch:
 *     summary: Update the currently logged-in user's data
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: user Updated
 *               email:
 *                 type: string
 *                 example: user.updated@email.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: User data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 68e83a15880a75367e3dbe55
 *                 name:
 *                   type: string
 *                   example: user Updated
 *                 email:
 *                   type: string
 *                   example: user.updated@email.com
 *                 profileUrl:
 *                   type: string
 *                   example: https://url.image.com/image
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-10-09T22:41:25.449Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-10-09T23:00:00.000Z
 *       400:
 *         description: Bad Request – Validation failed
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
 *       401:
 *         description: Unauthorized – No token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: no token provided
 */
userRoutes.patch('/', (req, res, next) =>
  userController.update(req, res, next),
);

/**
 * @openapi
 * /users:
 *   delete:
 *     summary: Delete the currently logged-in user
 *     tags:
 *       - Users
 *     responses:
 *       204:
 *         description: User deleted successfully (No Content)
 *       401:
 *         description: Unauthorized – No token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: no token provided
 */
userRoutes.delete('/', (req, res, next) =>
  userController.remove(req, res, next),
);

/**
 * @openapi
 * /users/profile:
 *   post:
 *     summary: Upload a profile image for the currently logged-in user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file to upload
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: image uploaded successfully
 *       401:
 *         description: Unauthorized – No token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: no token provided
 */
userRoutes.post('/profile', upload.single('profile'), (req, res, next) =>
  userController.uploadProfileImage(req, res, next),
);

/**
 * @openapi
 * /users/profile:
 *   delete:
 *     summary: Delete the profile image of the currently logged-in user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Profile image deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: image removed successfully
 *       400:
 *         description: Bad Request – User has no saved profile picture
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: user has no saved profile picture
 *       401:
 *         description: Unauthorized – No token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: no token provided
 */
userRoutes.delete('/profile', (req, res, next) =>
  userController.removeProfileImage(req, res, next),
);

export { userRoutes };
