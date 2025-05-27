// src/app.ts
import express from 'express';
import { connectDB } from './config/database.js';
import authRoutes      from './routes/auth.routes.js';
import branchRoutes    from './routes/branch.routes.js';
import memberRoutes    from './routes/member.routes.js';
import paymentRoutes   from './routes/payment.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { securityMiddlewares } from './middleware/security.js';

// 1. Connect to MongoDB once at startup
connectDB().catch((err: unknown) => {
  console.error('❌ Failed to connect to MongoDB in app():', err);
});

// 2. Initialize Express
export const app = express();

// 3. Apply security & hardening middlewares (order matters!)
app.use(securityMiddlewares);

// 4. Parse JSON bodies
app.use(express.json());

// 5. Mount feature routers
app.use('/api/auth',      authRoutes);
app.use('/api/branches',  branchRoutes);
app.use('/api/members',   memberRoutes);
app.use('/api/payments',  paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

// 6. Health check endpoint
app.get('/', (_req, res) => {
  res.send('ApexFit Backend is running!');
});

// 7. Global error handler (last)
app.use(errorHandler);
