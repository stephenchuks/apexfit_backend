import { MemberModel } from '../models/member.model.js';
export const MemberRepo = {
    async create(data) {
        const member = new MemberModel({
            ...data,
            startDate: new Date(data.startDate),
        });
        return member.save();
    },
    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [docs, total] = await Promise.all([
            MemberModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            MemberModel.countDocuments().exec(),
        ]);
        return { docs, total };
    },
    async findById(id) {
        return MemberModel.findById(id).exec();
    },
    async update(id, data) {
        if (data.startDate) {
            data.startDate = new Date(data.startDate);
        }
        return MemberModel.findByIdAndUpdate(id, data, { new: true }).exec();
    },
    async remove(id) {
        return MemberModel.findByIdAndDelete(id).exec();
    },
};
