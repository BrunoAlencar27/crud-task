export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async findOne() {
    return this.userRepository.findOne('algum id');
  }
}
