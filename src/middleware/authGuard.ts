
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

export const authGuard = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      // now an unexpected server error instead of import-time crash
      throw new createHttpError.InternalServerError('JWT_SECRET not configured');
    }
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new createHttpError.Unauthorized('Authorization header missing or malformed');
    }
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (err) {
    next(err);
  }
};
