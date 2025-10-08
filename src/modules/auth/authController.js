import { throwValidationError } from '../../common/utils/throwValidationError.js';
import { userMapper } from '../../modules/user/utils/userMapper.js';
import { cookieConfig } from '../../config/cookies.js';
import { loginUserSchema } from './validation/loginUserSchema.js';
import { registerUserSchema } from './validation/registerUserSchema.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res, next) {
    try {
      const validUser = registerUserSchema.validate(req.body, {
        abortEarly: false,
      });

      if (validUser.error) throwValidationError(validUser);

      const user = await this.authService.register(validUser.value);
      res.status(201).json(userMapper(user));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const validLogin = loginUserSchema.validate(req.body, {
        abortEarly: false,
      });

      if (validLogin.error) throwValidationError(validLogin);

      const token = await this.authService.login(validLogin.value);

      res.cookie('token', token, cookieConfig);
      res.json({ message: 'user logged in successfully' });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie('token');
      res.json({ message: 'user logged out successfully' });
    } catch (error) {
      next(error);
    }
  }
}
