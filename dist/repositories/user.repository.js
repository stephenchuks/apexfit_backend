import { UserModel } from '../models/user.model.js';
export const UserRepo = {
    async create(data) {
        const user = new UserModel(data);
        return user.save();
    },
    async findByEmail(email) {
        return UserModel.findOne({ email }).exec();
    },
    async findById(id) {
        return UserModel.findById(id).exec();
    }
};
