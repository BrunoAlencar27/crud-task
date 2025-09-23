import { UserModel } from './userModel.js';

export class UserRepository {
  async create(userData) {
    return UserModel.create(userData);
  }

  async findByEmail(email) {
    return UserModel.findOne({ email }).exec();
  }
}
