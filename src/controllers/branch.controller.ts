// src/controllers/branch.controller.ts
import { Request, Response, NextFunction } from 'express';
import { redisClient, redisReady } from '../config/redis.js';
import { BranchService } from '../services/branch.service.js';
import { BranchCreateSchema, BranchUpdateSchema } from '../schemas/branch.schema.js';
import { z } from 'zod';

/**
 * Create a new branch
 */
export const createBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const input = BranchCreateSchema.parse(req.body);
    const branch = await BranchService.createBranch(input);
    res.status(201).json(branch);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ errors: err.flatten() });
    } else {
      next(err);
    }
  }
};

/**
 * List branches with pagination & optional caching
 */
export const listBranches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page  = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);
    const result = await BranchService.listBranches(page, limit);

    // Save into cache if configured
    if (redisClient && redisReady && res.locals.cacheKey) {
      await redisClient.setEx(res.locals.cacheKey, res.locals.ttl, JSON.stringify(result));
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * Get one branch by ID
 */
export const getBranchById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const branch = await BranchService.getBranchById(req.params.id);
    res.status(200).json(branch);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a branch by ID
 */
export const updateBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const input   = BranchUpdateSchema.parse(req.body);
    const updated = await BranchService.updateBranch(req.params.id, input);
    res.status(200).json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ errors: err.flatten() });
    } else {
      next(err);
    }
  }
};

/**
 * Delete a branch by ID
 */
export const deleteBranch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await BranchService.deleteBranch(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
