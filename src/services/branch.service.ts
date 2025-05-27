// src/services/branch.service.ts
import createHttpError from 'http-errors';
import type { MongoError } from 'mongodb';
import { BranchRepo } from '../repositories/branch.repository.js';
import type { BranchCreateInput, BranchUpdateInput } from '../schemas/branch.schema.js';

export class BranchService {
  static async createBranch(input: BranchCreateInput) {
    try {
      return await BranchRepo.create(input);
    } catch (err: any) {
      if ((err as MongoError).code === 11000) {
        const dupKey = Object.keys((err as any).keyValue)[0];
        throw new createHttpError.Conflict(`Branch with this ${dupKey} already exists`);
      }
      throw err;
    }
  }

  static async listBranches(page = 1, limit = 20) {
    return BranchRepo.findAll(page, limit);
  }

  static async getBranchById(id: string) {
    const branch = await BranchRepo.findById(id);
    if (!branch) {
      throw new createHttpError.NotFound(`Branch with id ${id} not found`);
    }
    return branch;
  }

  static async updateBranch(id: string, input: BranchUpdateInput) {
    try {
      const updated = await BranchRepo.update(id, input);
      if (!updated) {
        throw new createHttpError.NotFound(`Branch with id ${id} not found`);
      }
      return updated;
    } catch (err: any) {
      if ((err as MongoError).code === 11000) {
        const dupKey = Object.keys((err as any).keyValue)[0];
        throw new createHttpError.Conflict(`Branch with this ${dupKey} already exists`);
      }
      throw err;
    }
  }

  static async deleteBranch(id: string) {
    const deleted = await BranchRepo.remove(id);
    if (!deleted) {
      throw new createHttpError.NotFound(`Branch with id ${id} not found`);
    }
    return deleted;
  }
}
