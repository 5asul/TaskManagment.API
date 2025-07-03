import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';
import apiRouter from './routes';
import prisma from './prisma/client';
import swaggerDocument from './swagger/swaggerDocument';

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());

// Swagger/OpenAPI setup

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Improved error handler middleware (must be last)
app.use(((err, req, res) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: err.errors });
  }
  if (typeof err === 'object' && err !== null && 'errors' in err) {
    // Business error
    return res.status(400).json({ error: (err as { errors: { message: string }[] }).errors });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}) as import('express').ErrorRequestHandler);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  // Graceful shutdown
  const shutdown = async () => {
    await prisma.$disconnect();
    server.close(() => {
      process.exit(0);
    });
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

export default app;
