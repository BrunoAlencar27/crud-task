import { throwValidationError } from '../../common/utils/throwValidationError.js';
import { userMapper } from './utils/userMapper.js';
import { updateUserSchema } from './validation/updateUserSchema.js';

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async show(req, res, next) {
    try {
      const user = await this.userService.findById(req.userId);
      res.json(userMapper(user));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const validUpdateData = updateUserSchema.validate(req.body, {
        abortEarly: false,
      });

      if (validUpdateData.error) throwValidationError(validUpdateData);

      const userUpdated = await this.userService.update(
        req.userId,
        validUpdateData.value,
      );
      res.json(userMapper(userUpdated));
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      await this.userService.remove(this.userId);
      res.clearCookie('token');

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
