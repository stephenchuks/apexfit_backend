import { BranchModel, BranchDoc } from '../models/branch.model.js';
import { BranchCreateInput, BranchUpdateInput } from '../schemas/branch.schema.js';

export const BranchRepo = {
  async create(data: BranchCreateInput): Promise<BranchDoc> {
    const branch = new BranchModel(data);
    return branch.save();
  },

  async findAll(): Promise<BranchDoc[]> {
    return BranchModel.find().sort({ createdAt: -1 }).exec();
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
