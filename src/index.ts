import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/database.js';
import authRoutes   from './routes/auth.routes.js';
import branchRoutes from './routes/branch.routes.js';
import memberRoutes from './routes/member.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

async function bootstrap() {
  console.log('🔧 Starting application…');
  await connectDB();

  const app = express();
  app.use(express.json());

  // Auth
  app.use('/api/auth', authRoutes);

  // Feature routes
  app.use('/api/branches', branchRoutes);
  app.use('/api/members',  memberRoutes);

  // Health check - handler must return void
  app.get('/', (_req, res) => {
    res.send('ApexFit Backend is running!');
  });

  // Global error handler
  app.use(errorHandler);

  const port = process.env.PORT ?? 4000;
  app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message, err.stack);
  process.exit(1);
});
process.on('unhandledRejection', (reason: any) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

bootstrap().catch((err) => {
  console.error('❌ Failed to start server:', err.message, err.stack);
  process.exit(1);
});
