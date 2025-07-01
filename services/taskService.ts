import prisma from '../prisma/client';
import { z } from 'zod';
import { taskSchema, taskQuerySchema } from '../validators/taskValidators';

type CreateTaskInput = z.infer<typeof taskSchema>;
type TaskQueryInput = z.infer<typeof taskQuerySchema>;

type TaskWhere = {
    status?: CreateTaskInput['status'];
    userId?: string;
    dueDate?: {
        gte?: Date;
        lte?: Date;
    };
};

export async function createTaskService(data: CreateTaskInput) {
    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) throw { errors: [{ message: 'User does not exist' }] };
    return prisma.task.create({ data: { ...data, dueDate: new Date(data.dueDate) } });
}

export async function getTasksService(query: TaskQueryInput) {
    const where: TaskWhere = {};
    if (query.status) where.status = query.status;
    if (query.userId) where.userId = query.userId;
    if (query.dueDateFrom || query.dueDateTo) {
        where.dueDate = {};
        if (query.dueDateFrom) where.dueDate.gte = new Date(query.dueDateFrom);
        if (query.dueDateTo) where.dueDate.lte = new Date(query.dueDateTo);
    }
    return prisma.task.findMany({
        where,
        skip: query.offset || 0,
        take: query.limit || 10,
        orderBy: { dueDate: 'asc' },
    });
}

export async function updateTaskStatusService(id: string, status: CreateTaskInput['status']) {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw { errors: [{ message: 'Task not found' }] };
    return prisma.task.update({ where: { id }, data: { status } });
}

export async function deleteTaskService(id: string) {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw { errors: [{ message: 'Task not found' }] };
    return prisma.task.delete({ where: { id } });
} 