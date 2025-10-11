import Router from 'express';
const taskRoutes = Router();
import { TaskController } from './taskController.js';
import { TaskService } from './taskService.js';
import { TaskRepository } from './taskRepository.js';

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

taskRoutes.post('/', (req, res) => taskController.create(req, res));
taskRoutes.get('/', (req, res) => taskController.find(req, res));
taskRoutes.get('/:id', (req, res, next) =>
  taskController.findById(req, res, next),
);
taskRoutes.patch('/:id', (req, res, next) =>
  taskController.updateById(req, res, next),
);
taskRoutes.delete('/:id', (req, res, next) =>
  taskController.deleteById(req, res, next),
);

export { taskRoutes };
