import express from 'express';
import { userRoutes } from './modules/user/userRoutes.js';
import { taskRoutes } from './modules/task/taskRoutes.js';

export function createApp() {
  const app = express();

  app.use(userRoutes);
  app.use(taskRoutes);

  return app;
}
