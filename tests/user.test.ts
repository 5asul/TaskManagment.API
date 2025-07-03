import request from 'supertest';
import app from '../index';

describe('User API', () => {
  it('should create a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'testuser@example.com' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test User');
    expect(res.body.email).toBe('testuser@example.com');
  });
});
