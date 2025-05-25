import createHttpError from 'http-errors';
import { BranchRepo } from '../repositories/branch.repository.js';
import { BranchCreateInput, BranchUpdateInput } from '../schemas/branch.schema.js';

export class BranchService {
  static async createBranch(input: BranchCreateInput) {
    return BranchRepo.create(input);
  }

  static async listBranches() {
    return BranchRepo.findAll();
  }

  static async getBranchById(id: string) {
    const branch = await BranchRepo.findById(id);
    if (!branch) {
      throw new createHttpError.NotFound(`Branch with id ${id} not found`);
    }
    return branch;
  }

  static async updateBranch(id: string, input: BranchUpdateInput) {
    const updated = await BranchRepo.update(id, input);
    if (!updated) {
      throw new createHttpError.NotFound(`Branch with id ${id} not found`);
    }
    return updated;
  }

  static async deleteBranch(id: string) {
    const deleted = await BranchRepo.remove(id);
    if (!deleted) {
      throw new createHttpError.NotFound(`Branch with id ${id} not found`);
    }
    return deleted;
  }
}
