import argon2 from 'argon2';
import { AppError } from '../../common/errors/appError.js';

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(userData) {
    const userExist = await this.userRepository.findByEmail(userData.email);
    if (userExist) throw new AppError(409, 'email already registered');

    const hashedPassword = await argon2.hash(userData.password);

    return this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async findById(id) {
    return this.userRepository.findById(id);
  }

  async findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }

  async update(id, updateData) {
    if (updateData.email) {
      const exist = await this.findByEmail(updateData.email);

      if (exist && exist.id !== id) {
        throw new AppError('email already registered');
      }
    }

    return this.userRepository.update(id, updateData);
  }

  async remove(id) {
    return this.userRepository.remove(id);
  }
}
