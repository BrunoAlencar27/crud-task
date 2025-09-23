import { Router } from 'express';
import { UserController } from './userController.js';
import { UserRepository } from './userRespository.js';
import { UserService } from './userService.js';

const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userRoutes };
