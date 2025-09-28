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

  async findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }
}
