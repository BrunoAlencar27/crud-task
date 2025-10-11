import Joi from 'joi';

export const updateTaskSchema = Joi.object({
  description: Joi.string().min(3).required(),
  completed: Joi.boolean().required(),
});
