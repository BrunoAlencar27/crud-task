export class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }
  async create(req, res) {
    const newTask = await this.taskService.create(req.body);
    return res.send(newTask);
  }
}
