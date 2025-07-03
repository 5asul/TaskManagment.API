import { Router } from 'express';
import TaskController from '../controllers/taskController';
import { validate } from '../validators/validate';
import { taskSchema, taskQuerySchema, statusSchema } from '../validators/taskValidators';

const router = Router();

router.post('/', validate(taskSchema), TaskController.createTask);
router.get('/', validate(taskQuerySchema, 'query'), TaskController.getTasks);
router.patch('/:id/status', validate(statusSchema), TaskController.updateTaskStatus);
router.delete('/:id', TaskController.deleteTask);

export default router;
