import { AppError } from '../errors/appError.js';
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  try {
    const token = req.cookies['token'];
    if (!token) throw new AppError(401, 'no token provided');

    try {
      const userPayload = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = userPayload.id;

      next();
    } catch {
      throw new AppError(401, 'invalid or expired token');
    }
  } catch (error) {
    next(error);
  }
}
