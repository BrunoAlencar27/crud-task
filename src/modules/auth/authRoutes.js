import { Router } from 'express';
import { AuthService } from './authService.js';
import { AuthController } from './authController.js';
import { UserService } from '../user/userService.js';
import { UserRepository } from '../user/userRespository.js';

const authRoutes = Router();

const authService = new AuthService();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(authService, userService);

authRoutes.post('/register', (req, res, next) =>
  authController.register(req, res, next),
);

export { authRoutes };
