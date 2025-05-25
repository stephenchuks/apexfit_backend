// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  err: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = (err as HttpError).status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
};
