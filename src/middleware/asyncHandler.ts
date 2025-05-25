// src/middleware/asyncHandler.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps an async controller so errors are caught and passed to next().
 */
export const asyncHandler = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
