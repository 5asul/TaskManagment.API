const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Task Management API',
    version: '1.0.0',
    description: 'API documentation for the Task Management system.',
  },
  servers: [{ url: 'http://localhost:3000/api', description: 'Local server' }],
  paths: {
    '/users': {
      post: {
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                },
                required: ['name', 'email'],
              },
            },
          },
        },
        responses: {
          201: { description: 'User created' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/tasks': {
      post: {
        summary: 'Create a new task',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  dueDate: { type: 'string', format: 'date-time' },
                  status: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
                  userId: { type: 'string', format: 'uuid' },
                },
                required: ['title', 'description', 'dueDate', 'status', 'userId'],
              },
            },
          },
        },
        responses: {
          201: { description: 'Task created' },
          400: { description: 'Validation error' },
        },
      },
      get: {
        summary: 'Get tasks with filters and pagination',
        parameters: [
          {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
          },
          { name: 'userId', in: 'query', schema: { type: 'string', format: 'uuid' } },
          { name: 'dueDateFrom', in: 'query', schema: { type: 'string', format: 'date-time' } },
          { name: 'dueDateTo', in: 'query', schema: { type: 'string', format: 'date-time' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'offset', in: 'query', schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: 'List of tasks' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/tasks/{id}/status': {
      patch: {
        summary: 'Update task status',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
                },
                required: ['status'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Task updated' },
          400: { description: 'Validation error' },
        },
      },
    },
    '/tasks/{id}': {
      delete: {
        summary: 'Delete a task',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        responses: {
          204: { description: 'Task deleted' },
        },
      },
    },
  },
};

export default swaggerDocument;
