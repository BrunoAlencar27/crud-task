import { UserModel } from './userModel.js';

export class UserRepository {
  async create(userData) {
    return UserModel.create(userData);
  }

  async findById(id) {
    return UserModel.findById(id);
  }

  async findByEmail(email) {
    return UserModel.findOne({ email }).exec();
  }

  async update(id, updateData) {
    return UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async remove(id) {
    return UserModel.deleteOne(id);
  }
}
