import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { userRoutes } from './modules/user/userRoutes.js';
import { taskRoutes } from './modules/task/taskRoutes.js';
import { errorHandler } from './common/middlewares/errorHandler.js';
import { authRoutes } from './modules/auth/authRoutes.js';
import { authMiddleware } from './common/middlewares/authMiddleware.js';
import { swaggerSpec } from './config/swagger.js';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  app.use('/tasks', authMiddleware, taskRoutes);
  app.use('/users', authMiddleware, userRoutes);
  app.use('/auth', authRoutes);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(errorHandler);

  app.use = express(
    cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  return app;
}
