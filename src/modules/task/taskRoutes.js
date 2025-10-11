import Router from 'express';
const taskRoutes = Router();
import { TaskController } from './taskController.js';
import { TaskService } from './taskService.js';
import { TaskRepository } from './taskRepository.js';

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Pagar as contas do mês"
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "68e9aa0aa16bbd40f53d13bd"
 *                 description:
 *                   type: string
 *                   example: "Pagar as contas do mês"
 *                 completed:
 *                   type: boolean
 *                   example: false
 *                 userId:
 *                   type: string
 *                   example: "68e9a19d41de868ca52ef4b2"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-11T00:51:22.098Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-11T01:09:07.607Z"
 *       400:
 *         description: Bad Request – Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "\"description\" length must be at least 3 characters long"
 */
taskRoutes.post('/', (req, res) => taskController.create(req, res));

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: List all tasks
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "68e9aa0aa16bbd40f53d13bd"
 *                       description:
 *                         type: string
 *                         example: "Pagar as contas da semana"
 *                       completed:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-11T00:51:22.098Z"
 *                       updateAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-11T00:51:22.098Z"
 */
taskRoutes.get('/', (req, res) => taskController.find(req, res));

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Search for a task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to be fetched
 *     responses:
 *       200:
 *         description: Task found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "68e9aa0aa16bbd40f53d13bd"
 *                 description:
 *                   type: string
 *                   example: "Pagar as contas do mês"
 *                 completed:
 *                   type: boolean
 *                   example: false
 *                 userId:
 *                   type: string
 *                   example: "68e9a19d41de868ca52ef4b2"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-11T00:51:22.098Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-11T01:09:07.607Z"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Task not found"
 */
taskRoutes.get('/:id', (req, res, next) =>
  taskController.findById(req, res, next),
);

/**
 * @openapi
 * /tasks/{id}:
 *   patch:
 *     summary: Partially update a task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Pagar as contas atrasadas"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "68e9aa0aa16bbd40f53d13bd"
 *                 description:
 *                   type: string
 *                   example: "Pagar as contas atrasadas"
 *                 completed:
 *                   type: boolean
 *                   example: true
 *                 userId:
 *                   type: string
 *                   example: "68e9a19d41de868ca52ef4b2"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-11T00:51:22.098Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-11T02:30:00.000Z"
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Task not found"
 */
taskRoutes.patch('/:id', (req, res, next) =>
  taskController.updateById(req, res, next),
);
/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to be deleted
 *     responses:
 *       204:
 *         description:Task deleted successfully (no content)
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Task not found"
 */
taskRoutes.delete('/:id', (req, res, next) =>
  taskController.deleteById(req, res, next),
);

export { taskRoutes };
