import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';

interface BusinessError {
  errors: { message: string }[];
}

const userService = new UserService();

class UserController {
  private static isBusinessError(err: unknown): err is BusinessError {
    return typeof err === 'object' && err !== null && 'errors' in err;
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const user = await userService.createUser(data);
      res.status(201).json(user);
      return;
    } catch (err: unknown) {
      if (UserController.isBusinessError(err)) {
        res.status(400).json({ error: err.errors });
        return;
      }
      next(err);
    }
  }
}

export default UserController;
