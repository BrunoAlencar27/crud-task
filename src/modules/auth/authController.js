import { throwValidationError } from '../../common/utils/throwValidationError.js';
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
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }
}
