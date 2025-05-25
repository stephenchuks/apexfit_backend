import mongoose, { Schema } from 'mongoose';
const MemberSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phoneNumber: { type: String, required: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    startDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const MemberModel = mongoose.model('Member', MemberSchema);
