import mongoose, { Schema, Document, Model } from 'mongoose';

export interface MemberDoc extends Document {
  firstName:   string;
  lastName:    string;
  email:       string;
  phoneNumber: string;
  branchId:    mongoose.Types.ObjectId;
  joinDate:    Date;          // ← new field
  isActive:    boolean;
  status:      'active'|'inactive'; // ← new field for quick filtering
  createdAt:   Date;
  updatedAt:   Date;
}

const MemberSchema = new Schema<MemberDoc>(
  {
    firstName:   { type: String, required: true, trim: true },
    lastName:    { type: String, required: true, trim: true },
    email:       { type: String, required: true, lowercase: true, unique: true },
    phoneNumber: { type: String, required: true },
    branchId:    { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    joinDate:    { type: Date, default: () => new Date() }, // default to now
    isActive:    { type: Boolean, default: true },
    status:      { type: String, enum: ['active','inactive'], default: 'active' },
  },
  { timestamps: true },
);

export const MemberModel: Model<MemberDoc> = mongoose.model<MemberDoc>(
  'Member',
  MemberSchema
);
