// src/middleware/security.ts

import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import type { RequestHandler } from 'express';

/**
 * Security middlewares bundled for import in app.ts
 */
export const securityMiddlewares: RequestHandler[] = [
  // 1. Set HTTP headers to secure defaults
  helmet(),

  // 2. Enable CORS (configure origins as needed)
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
  }),

  // 3. Basic rate limiter — 100 requests per 15 minutes per IP
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
  }),

  // 4. Prevent NoSQL injection via req.body, req.query, req.params
  mongoSanitize(),

  // 5. Prevent XSS attacks by sanitizing user input
  xssClean(),
];
