import { Request, Response, NextFunction } from 'express';
import { createTaskService, getTasksService, updateTaskStatusService, deleteTaskService } from '../services/taskService';
import { taskSchema, taskQuerySchema, statusSchema } from '../validators/taskValidators';
import { ZodError } from 'zod';

interface BusinessError {
    errors: { message: string }[];
}

function isBusinessError(err: unknown): err is BusinessError {
    return typeof err === 'object' && err !== null && 'errors' in err;
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const data = taskSchema.parse(req.body);
        const task = await createTaskService(data);
        res.status(201).json(task);
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res.status(400).json({ error: err.errors });
        }
        if (isBusinessError(err)) {
            return res.status(400).json({ error: err.errors });
        }
        next(err);
    }
}

export async function getTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const query = taskQuerySchema.parse(req.query);
        const tasks = await getTasksService(query);
        res.json(tasks);
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res.status(400).json({ error: err.errors });
        }
        if (isBusinessError(err)) {
            return res.status(400).json({ error: err.errors });
        }
        next(err);
    }
}

export async function updateTaskStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const data = statusSchema.parse(req.body);
        const task = await updateTaskStatusService(id, data.status);
        res.json(task);
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res.status(400).json({ error: err.errors });
        }
        if (isBusinessError(err)) {
            return res.status(400).json({ error: err.errors });
        }
        next(err);
    }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        await deleteTaskService(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
} 