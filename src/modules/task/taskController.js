import { createTaskSchema } from './validation/createTaskSchema.js';
import { updateTaskSchema } from './validation/updateTaskSchema.js';
import { throwValidationError } from '../../common/utils/throwValidationError.js';

export class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  async create(req, res) {
    const validCreateData = createTaskSchema.validate(req.body, {
      abortEarly: false,
    });

    if (validCreateData.error) throwValidationError(validCreateData);

    try {
      const newTask = await this.taskService.create(req.body, req.userId);
      res.status(200).json({ data: newTask });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  async find(req, res) {
    try {
      const tasks = await this.taskService.find(req.userId);
      res.status(200).json({ data: tasks });
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  async findById(req, res, next) {
    try {
      const task = await this.taskService.findById(req.params.id);
      res.status(200).json({ data: task });
    } catch (err) {
      next(err);
    }
  }

  async updateById(req, res, next) {
    try {
      const validUpdateData = updateTaskSchema.validate(req.body, {
        abortEarly: false,
      });

      if (validUpdateData.error) throwValidationError(validUpdateData);

      const task = await this.taskService.updateById(req.params.id, req.body);
      res.status(201).json({ data: task });
    } catch (err) {
      next(err);
    }
  }

  async deleteById(req, res, next) {
    try {
      const taskRemove = await this.taskService.deleteById(req.params.id);
      res.status(204).json({ data: taskRemove });
    } catch (err) {
      next(err);
    }
  }
  async deleteAll(req, res, next) {
    try {
      await this.taskService.deleteAll(req.userId);
      res.status(200).json({ message: 'all tasks have been removed' });
    } catch (err) {
      next(err);
    }
  }
}
