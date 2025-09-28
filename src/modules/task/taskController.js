export class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }
  //funciona já
  async create(req, res) {
    //testado e funcionando
    req.userId = 123;
    try {
      const newTask = await this.taskService.create(req.body, req.userId);
      res
        .status(201)
        .json({ message: 'Task criado com sucesso', data: newTask });
    } catch (err) {
      res.json({ error: err.message });
    }
  }
  //testado e funcionando
  async find(req, res) {
    //teste não mexa
    req.userId = '123';
    try {
      const listTasks = await this.taskService.find(req.userId);
      res.status(201).json({ message: 'Taks listadas', data: listTasks });
    } catch (err) {
      res.json({ error: err.message });
    }
  }
  //testado e funconando
  async findById(req, res, next) {
    try {
      const task = await this.taskService.findById(req.params.id);
      res.status(201).json({ message: 'Tak encontrada', data: task });
    } catch (err) {
      next(err);
    }
  }

  //não testado ainda
  async updateById(req, res, next) {
    try {
      const task = await this.taskService.updateById(req.params.id, req.body);
      res.status(201).json({ message: 'Atualizado com sucesso', data: task });
    } catch (err) {
      next(err);
    }
  }

  //não testado ainda
  async deleteById(req, res, next) {
    try {
      const taskRemove = await this.taskService.deleteById(req.params.id);
      res
        .status(201)
        .json({ message: 'Removido com sucesso', data: taskRemove });
    } catch (err) {
      next(err);
    }
  }

  //não testado ainda
  async delete(req, res, next) {
    req.userId;
    try {
      const tasks = await this.taskService.delete(req.userId);
      res
        .status(201)
        .json({ message: 'Todas as taks foram removidas', data: tasks });
    } catch (err) {
      next(err);
    }
  }
}
