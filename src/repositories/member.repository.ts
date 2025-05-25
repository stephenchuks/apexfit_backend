import { MemberModel, MemberDoc } from '../models/member.model.js';
import { MemberCreateInput, MemberUpdateInput } from '../schemas/member.schema.js';

export const MemberRepo = {
  async create(data: MemberCreateInput): Promise<MemberDoc> {
    const member = new MemberModel({
      ...data,
      startDate: new Date(data.startDate),
    });
    return member.save();
  },

  async findAll(page = 1, limit = 20): Promise<{ docs: MemberDoc[]; total: number }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      MemberModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      MemberModel.countDocuments().exec(),
    ]);
    return { docs, total };
  },

  async findById(id: string): Promise<MemberDoc | null> {
    return MemberModel.findById(id).exec();
  },

  async update(id: string, data: MemberUpdateInput): Promise<MemberDoc | null> {
    if (data.startDate) {
      (data as any).startDate = new Date((data as any).startDate);
    }
    return MemberModel.findByIdAndUpdate(id, data, { new: true }).exec();
  },

  async remove(id: string): Promise<MemberDoc | null> {
    return MemberModel.findByIdAndDelete(id).exec();
  },
};
