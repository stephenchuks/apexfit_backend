import createHttpError from 'http-errors';
import { BranchRepo } from '../repositories/branch.repository.js';
export class BranchService {
    static async createBranch(input) {
        return BranchRepo.create(input);
    }
    static async listBranches() {
        return BranchRepo.findAll();
    }
    static async getBranchById(id) {
        const branch = await BranchRepo.findById(id);
        if (!branch) {
            throw new createHttpError.NotFound(`Branch with id ${id} not found`);
        }
        return branch;
    }
    static async updateBranch(id, input) {
        const updated = await BranchRepo.update(id, input);
        if (!updated) {
            throw new createHttpError.NotFound(`Branch with id ${id} not found`);
        }
        return updated;
    }
    static async deleteBranch(id) {
        const deleted = await BranchRepo.remove(id);
        if (!deleted) {
            throw new createHttpError.NotFound(`Branch with id ${id} not found`);
        }
        return deleted;
    }
}
