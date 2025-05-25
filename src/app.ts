// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes   from './routes/auth.routes.js';
import branchRoutes from './routes/branch.routes.js';
import memberRoutes from './routes/member.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

// Ensure DB connection early
connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB in app():', err);
  // We don't exit here; tests may stub DB connection
});

export const app = express();
app.use(express.json());

// Mount feature routers
app.use('/api/auth',    authRoutes);
app.use('/api/branches',branchRoutes);
app.use('/api/members', memberRoutes);

// Health check
app.get('/', (_req, res) => {
  res.send('ApexFit Backend is running!');
});

// Error handler (must be last)
app.use(errorHandler);
