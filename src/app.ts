// src/app.ts
import express from 'express';
import { connectDB } from './config/database.js';
import authRoutes     from './routes/auth.routes.js';
import branchRoutes   from './routes/branch.routes.js';
import memberRoutes   from './routes/member.routes.js';
import paymentRoutes  from './routes/payment.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Connect to MongoDB once at startup
connectDB().catch((err: unknown) => {
  console.error('❌ Failed to connect to MongoDB in app():', err);
  // Note: not exiting process to allow tests to override connectDB()
});

export const app = express();

app.use(express.json());

// Mount feature routers
app.use('/api/auth',      authRoutes);
app.use('/api/branches',  branchRoutes);
app.use('/api/members',   memberRoutes);
app.use('/api/payments',  paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check endpoint
app.get('/', (_req, res) => {
  res.send('ApexFit Backend is running!');
});

// Global error handler (must be last)
app.use(errorHandler);
