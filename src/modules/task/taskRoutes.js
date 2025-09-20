import Router from 'express';
const taskRoutes = Router();
import { TaskController } from './taskController.js';
import { TaskService } from './taskService.js';
import { TaskRepository } from './taskRepository.js';

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

taskRoutes.get('/tasks', (req, res) => taskController.create(req, res));

export { taskRoutes };
