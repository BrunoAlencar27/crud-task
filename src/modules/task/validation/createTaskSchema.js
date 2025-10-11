import Joi from 'joi';

export const createTaskSchema = Joi.object({
  description: Joi.string().min(3).required(),
});
