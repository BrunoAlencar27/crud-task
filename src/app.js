import express from 'express';
import { userRoutes } from './modules/user/userRoutes.js';
import { taskRoutes } from './modules/task/taskRoutes.js';
import { errorHandler } from './common/middlewares/errorHandler.js';
import { authRoutes } from './modules/auth/authRoutes.js';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use(taskRoutes);
  app.use('/users', userRoutes);
  app.use('/auth', authRoutes);

  app.use(errorHandler);
  return app;
}
