import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/auth.service.js';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema.js';

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input = RegisterSchema.parse(req.body);
      const user  = await AuthService.register(input);
      res.status(201).json(user);
      return;
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ errors: err.flatten() });
        return;
      }
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input  = LoginSchema.parse(req.body);
      const result = await AuthService.login(input);
      res.json(result);
      return;
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ errors: err.flatten() });
        return;
      }
      next(err);
    }
  }
};
