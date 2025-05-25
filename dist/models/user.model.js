import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['super-admin', 'branch-admin', 'staff', 'trainer'], default: 'staff' },
}, { timestamps: true });
export const UserModel = mongoose.model('User', UserSchema);
