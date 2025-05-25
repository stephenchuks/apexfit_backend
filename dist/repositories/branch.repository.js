import { BranchModel } from '../models/branch.model.js';
export const BranchRepo = {
    async create(data) {
        const branch = new BranchModel(data);
        return branch.save();
    },
    async findAll() {
        return BranchModel.find().sort({ createdAt: -1 }).exec();
    },
    async findById(id) {
        return BranchModel.findById(id).exec();
    },
    async update(id, data) {
        return BranchModel.findByIdAndUpdate(id, data, { new: true }).exec();
    },
    async remove(id) {
        return BranchModel.findByIdAndDelete(id).exec();
    },
};
