import express from 'express';
import { userRoutes } from './modules/user/userRoutes.js';

export function createApp() {
  const app = express();

  app.use(userRoutes);

  return app;
}
