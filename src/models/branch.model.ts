import mongoose, { Schema, Document, Model } from 'mongoose';

export interface BranchDoc extends Document {
  name: string;
  address: string;
  contactEmail: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema = new Schema<BranchDoc>(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    contactEmail: { type: String, required: true, lowercase: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true },
);

export const BranchModel: Model<BranchDoc> = mongoose.model<BranchDoc>(
  'Branch',
  BranchSchema,
);
