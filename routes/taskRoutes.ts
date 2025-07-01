import { Router, RequestHandler } from 'express';
import { createTask, getTasks, updateTaskStatus, deleteTask } from '../controllers/taskController';

const router = Router();

router.post('/', createTask as RequestHandler);
router.get('/', getTasks as RequestHandler);
router.patch('/:id/status', updateTaskStatus as RequestHandler);
router.delete('/:id', deleteTask as RequestHandler);

export default router; 