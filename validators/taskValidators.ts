import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.string().datetime(),
  status: z.enum(['pending', 'in_progress', 'completed']),
  userId: z.string().uuid(),
});

export const taskQuerySchema = z.object({
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  userId: z.string().uuid().optional(),
  dueDateFrom: z.string().datetime().optional(),
  dueDateTo: z.string().datetime().optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  offset: z.string().regex(/^\d+$/).transform(Number).optional(),
});

export const statusSchema = z.object({
  status: z.enum(['pending', 'in_progress', 'completed']),
});
