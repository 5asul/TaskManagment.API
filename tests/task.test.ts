import request from 'supertest';
import app from '../index';

describe('Task API', () => {
    let userId: string;
    let taskId: string;

    beforeAll(async () => {
        // Create a user to assign tasks to
        const userRes = await request(app)
            .post('/api/users')
            .send({ name: 'Task User', email: 'taskuser@example.com' });
        userId = userRes.body.id;
    });

    it('should create a task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Test Task',
                description: 'A test task',
                dueDate: new Date().toISOString(),
                status: 'pending',
                userId,
            });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test Task');
        taskId = res.body.id;
    });

    it('should list tasks with pagination and filters', async () => {
        const res = await request(app)
            .get('/api/tasks')
            .query({ userId, status: 'pending', limit: 5, offset: 0 });
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.body[0].userId).toBe(userId);
    });

    it('should update task status', async () => {
        const res = await request(app)
            .patch(`/api/tasks/${taskId}/status`)
            .send({ status: 'completed' });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('completed');
    });

    it('should delete a task', async () => {
        const res = await request(app)
            .delete(`/api/tasks/${taskId}`);
        expect(res.status).toBe(204);
    });
}); 