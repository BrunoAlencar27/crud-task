export class TaskService {
  constuctor(taskRepository) {
    this.taskRepository = taskRepository;
  }
  async findOne() {
    return this.taskRepository.findOne('passo id');
  }
}
