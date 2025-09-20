import { Router } from 'express';
import { TaskController } from './taskController.js';
import { TaskService } from './taskService.js';
import { TaskRepository } from './taskRepository.js';

const taskRoutes = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

taskRoutes.get('/tasks', (req, res) => taskController.findOne(req, res));

export { taskRoutes };
