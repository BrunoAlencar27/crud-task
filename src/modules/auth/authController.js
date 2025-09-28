import { throwValidationError } from '../../common/utils/throwValidationError.js';
import { userMapper } from '../../common/utils/userMapper.js';
import { registerUserSchema } from './validation/registerUserSchema.js';

export class AuthController {
  constructor(authService, userService) {
    this.authService = authService;
    this.userService = userService;
  }

  async register(req, res, next) {
    try {
      const validUser = registerUserSchema.validate(req.body, {
        abortEarly: false,
      });

      if (validUser.error) throwValidationError(validUser);

      const user = await this.userService.create(validUser.value);
      res.status(201).json(userMapper(user));
    } catch (error) {
      next(error);
    }
  }
}
