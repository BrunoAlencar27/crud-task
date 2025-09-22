import { AppError } from '../errors/appError.js';

export function errorHandler(error, _req, res, _next) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ errors: error.messages });
    return;
  }

  console.log(error);
  res.status(500).json({ errors: ['Internal Server Error'] });
}
