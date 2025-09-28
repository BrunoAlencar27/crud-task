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

authRoutes.post('/register', (req, res, next) =>
  authController.register(req, res, next),
);
authRoutes.post('/login', (req, res, next) =>
  authController.login(req, res, next),
);
authRoutes.post('/logout', (req, res, next) =>
  authController.logout(req, res, next),
);

export { authRoutes };
