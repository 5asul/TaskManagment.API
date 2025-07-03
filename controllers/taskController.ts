import { Request, Response, NextFunction } from 'express';
import TaskService from '../services/taskService';

interface BusinessError {
  errors: { message: string }[];
}

class TaskController {
  private static isBusinessError(err: unknown): err is BusinessError {
    return typeof err === 'object' && err !== null && 'errors' in err;
  }

  public static async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const task = await TaskService.createTask(data);
      res.status(201).json(task);
      return;
    } catch (err: unknown) {
      if (TaskController.isBusinessError(err)) {
        res.status(400).json({ error: err.errors });
        return;
      }
      next(err);
    }
  }

  public static async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const tasks = await TaskService.getTasks(query);
      res.json(tasks);
      return;
    } catch (err: unknown) {
      if (TaskController.isBusinessError(err)) {
        res.status(400).json({ error: err.errors });
        return;
      }
      next(err);
    }
  }

  public static async updateTaskStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      const task = await TaskService.updateTaskStatus(id, data.status);
      res.json(task);
      return;
    } catch (err: unknown) {
      if (TaskController.isBusinessError(err)) {
        res.status(400).json({ error: err.errors });
        return;
      }
      next(err);
    }
  }

  public static async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await TaskService.deleteTask(id);
      res.status(204).send();
      return;
    } catch (err) {
      next(err);
    }
  }
}

export default TaskController;
