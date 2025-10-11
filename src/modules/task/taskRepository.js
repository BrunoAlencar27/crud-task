import { TaskModel } from './taskModel.js';

export class TaskRepository {
  async create(taskData, userId) {
    const { description, completed } = taskData;
    const newTask = new TaskModel({ description, completed, userId });
    await newTask.save();
    return newTask;
  }

  async find(userId) {
    const tasks = await TaskModel.find({ userId: userId });
    return tasks;
  }

  async findById(taskId) {
    const task = await TaskModel.findById(taskId);
    return task;
  }

  async updateById(taskId, updateData) {
    const task = await TaskModel.findByIdAndUpdate(taskId, {
      description: updateData.description,
      completed: updateData.completed,
    });
    return task;
  }

  async deleteById(taskId) {
    const task = await TaskModel.findByIdAndDelete(taskId);
    return task;
  }
}
