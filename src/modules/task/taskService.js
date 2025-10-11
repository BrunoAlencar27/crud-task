import { AppError } from '../../common/errors/appError.js';
export class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }
  async create(taskData, userId) {
    taskData.completed = false;
    const newTask = await this.taskRepository.create(taskData, userId);
    return newTask;
  }

  async find(userId) {
    const listTasks = await this.taskRepository.find(userId);
    return listTasks;
  }

  async findById(taskId) {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new AppError(404, 'Task not found');
    return task;
  }

  async updateById(taskId, updateData) {
    const task = await this.taskRepository.updateById(taskId, updateData);
    if (!task) throw new AppError(404, 'Task not found');
    return task;
  }

  async deleteById(taskId) {
    const task = await this.taskRepository.deleteById(taskId);
    if (!task) throw new AppError(404, 'Task not found');
    return task;
  }

  async deleteAll(userId) {
    const tasks = await this.taskRepository.deleteAll(userId);
    return tasks;
  }
}
