import { UserModel, UserDoc } from '../models/user.model.js';
import { RegisterInput } from '../schemas/auth.schema.js';

export const UserRepo = {
  async create(data: RegisterInput & { passwordHash: string }): Promise<UserDoc> {
    const user = new UserModel(data);
    return user.save();
  },
  async findByEmail(email: string): Promise<UserDoc|null> {
    return UserModel.findOne({ email }).exec();
  },
  async findById(id: string): Promise<UserDoc|null> {
    return UserModel.findById(id).exec();
  }
};
