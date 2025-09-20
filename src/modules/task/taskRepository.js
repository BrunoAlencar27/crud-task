import { TaskModel } from './taskModel.js';

export class TaskRepository {
  async create(taskData) {
    const { userId, description, completed = false } = taskData;
    const newTask = new TaskModel(userId, description, completed);
    await newTask.save();
  }
}
