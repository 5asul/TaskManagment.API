import { Router, RequestHandler } from 'express';
import { createUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser as RequestHandler);

export default router; 