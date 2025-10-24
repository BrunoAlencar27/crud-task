import argon2 from 'argon2';
import { AppError } from '../../common/errors/appError.js';
import jwt from 'jsonwebtoken';
export class AuthService {
  constructor(userService) {
    this.userService = userService;
  }

  async register(userData) {
    return this.userService.create(userData);
  }

  async login(loginData) {
    const user = await this.userService.findByEmail(loginData.email);
    if (!user) throw new AppError(401, 'invalid credentials');

    const verify = await argon2.verify(user.password, loginData.password);
    if (!verify) throw new AppError(401, 'invalid credentials');

    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });
  }
}
