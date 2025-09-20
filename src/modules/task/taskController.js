//Entradas de dados no geral podem ser verificadas no controller
export class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  async findOne(req, res) {
    res.send(this.taskService.findOne());
  }
}
