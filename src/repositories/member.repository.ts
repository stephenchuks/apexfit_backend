// src/repositories/member.repository.ts
import { MemberModel, MemberDoc } from '../models/member.model.js';
import { MemberCreateInput, MemberUpdateInput } from '../schemas/member.schema.js';

export const MemberRepo = {
  async create(data: MemberCreateInput): Promise<MemberDoc> {
    // convert joinDate string to Date if provided
    const record: any = { ...data };
    if (data.joinDate) {
      record.joinDate = new Date(data.joinDate);
    }
    return new MemberModel(record).save();
  },

  async findAll(page = 1, limit = 20): Promise<{ docs: MemberDoc[]; total: number }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      MemberModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      MemberModel.countDocuments().exec(),
    ]);
    return { docs, total };
  },

  async findById(id: string): Promise<MemberDoc | null> {
    return MemberModel.findById(id).exec();
  },

  async update(id: string, data: MemberUpdateInput): Promise<MemberDoc | null> {
    // convert joinDate if provided
    const update: any = { ...data };
    if (data.joinDate) {
      update.joinDate = new Date(data.joinDate);
    }
    return MemberModel.findByIdAndUpdate(id, update, { new: true }).exec();
  },

  async remove(id: string): Promise<MemberDoc | null> {
    return MemberModel.findByIdAndDelete(id).exec();
  },
};
