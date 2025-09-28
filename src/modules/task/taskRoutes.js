import Router from 'express';
const taskRoutes = Router();
import { TaskController } from './taskController.js';
import { TaskService } from './taskService.js';
import { TaskRepository } from './taskRepository.js';

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

taskRoutes.post('/tasks', (req, res) => taskController.create(req, res));
taskRoutes.get('/tasks', (req, res) => taskController.find(req, res));
taskRoutes.get('/tasks/:id', (req, res, next) => taskController.findById(req, res, next));
taskRoutes.patch('/tasks/:id', (req, res, next) => taskController.updateById(req, res, next));
taskRoutes.delete('/tasks/:id', (req, res, next) => taskController.deleteById(req, res, next));

export { taskRoutes };
