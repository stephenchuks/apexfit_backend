import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { BranchService } from '../services/branch.service.js';
import { BranchCreateSchema, BranchUpdateSchema } from '../schemas/branch.schema.js';

export const BranchController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input = BranchCreateSchema.parse(req.body);
      const branch = await BranchService.createBranch(input);
      res.status(201).json(branch);
      return;
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ errors: err.flatten() });
        return;
      }
      next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const branches = await BranchService.listBranches();
      res.json(branches);
      return;
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const branch = await BranchService.getBranchById(req.params.id);
      res.json(branch);
      return;
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input = BranchUpdateSchema.parse(req.body);
      const updated = await BranchService.updateBranch(req.params.id, input);
      res.json(updated);
      return;
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ errors: err.flatten() });
        return;
      }
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await BranchService.deleteBranch(req.params.id);
      res.status(204).end();
      return;
    } catch (err) {
      next(err);
    }
  },
};
