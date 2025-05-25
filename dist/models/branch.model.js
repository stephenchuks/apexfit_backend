import mongoose, { Schema } from 'mongoose';
const BranchSchema = new Schema({
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    contactEmail: { type: String, required: true, lowercase: true },
    phoneNumber: { type: String, required: true },
}, { timestamps: true });
export const BranchModel = mongoose.model('Branch', BranchSchema);
