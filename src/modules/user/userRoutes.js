import { Router } from 'express';
import { UserController } from './userController.js';
import { UserRepository } from './userRespository.js';
import { UserService } from './userService.js';

const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.get('/', (req, res, next) => userController.show(req, res, next));
userRoutes.patch('/', (req, res, next) =>
  userController.update(req, res, next),
);
userRoutes.delete('/', (req, res, next) =>
  userController.remove(req, res, next),
);

export { userRoutes };
