import express from 'express';
import cookieParser from 'cookie-parser';
import { userRoutes } from './modules/user/userRoutes.js';
import { taskRoutes } from './modules/task/taskRoutes.js';
import { errorHandler } from './common/middlewares/errorHandler.js';
import { authRoutes } from './modules/auth/authRoutes.js';
import { authMiddleware } from './common/middlewares/authMiddleware.js';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.use('/tasks', authMiddleware, taskRoutes);
  app.use('/users', userRoutes);
  app.use('/auth', authRoutes);

  app.use(errorHandler);
  return app;
}
