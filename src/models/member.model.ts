import mongoose, { Schema, Document, Model } from 'mongoose';

export interface MemberDoc extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  branchId: mongoose.Types.ObjectId;
  startDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<MemberDoc>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, lowercase: true, unique: true },
    phoneNumber: { type: String, required: true },
    branchId:  { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    startDate: { type: Date, required: true },
    isActive:  { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const MemberModel: Model<MemberDoc> = mongoose.model<MemberDoc>(
  'Member',
  MemberSchema,
);
