
import { BranchModel, BranchDoc } from '../models/branch.model.js';
import type { BranchCreateInput, BranchUpdateInput } from '../schemas/branch.schema.js';

export const BranchRepo = {
  async create(data: BranchCreateInput): Promise<BranchDoc> {
    const branch = new BranchModel(data);
    return branch.save();
  },

  async findAll(page = 1, limit = 20): Promise<{ docs: BranchDoc[]; total: number }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      BranchModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      BranchModel.countDocuments().exec(),
    ]);
    return { docs, total };
  },

  async findById(id: string): Promise<BranchDoc | null> {
    return BranchModel.findById(id).exec();
  },

  async update(id: string, data: BranchUpdateInput): Promise<BranchDoc | null> {
    return BranchModel.findByIdAndUpdate(id, data, { new: true }).exec();
  },

  async remove(id: string): Promise<BranchDoc | null> {
    return BranchModel.findByIdAndDelete(id).exec();
  },
};
