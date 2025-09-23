import { AppError } from '../errors/appError.js';

export function throwValidationError(validated) {
  const messages = validated.error.details.map((e) => e.message);
  throw new AppError(400, messages);
}
