export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async findOne(req, res) {
    res.send(this.userService.findOne());
  }
}
