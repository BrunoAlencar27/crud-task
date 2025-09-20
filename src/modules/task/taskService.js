export class TaskService {
  constructor(taskRepository) {
    this.taskrepository = taskRepository;
  }
  async create(taskData) {
    const newTask = await this.taskRepository.create(taskData);
    return newTask;
  }
}
