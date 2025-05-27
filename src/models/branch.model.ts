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
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,               // ← enforce uniqueness
      index: true,
    },
    address: { type: String, required: true },
    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,               // ← optional: ensure each branch email is unique
      index: true,
    },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true },
);

// Create compound index if desired, e.g. name+address
// BranchSchema.index({ name: 1, address: 1 }, { unique: true });

export const BranchModel: Model<BranchDoc> = mongoose.model<BranchDoc>(
  'Branch',
  BranchSchema,
);
