import mongoose, { Schema, Document, Model } from 'mongoose';

export type Role = 'super-admin'|'branch-admin'|'staff'|'trainer';

export interface UserDoc extends Document {
  firstName:    string;
  lastName:     string;
  email:        string;
  passwordHash: string;
  role:         Role;
  createdAt:    Date;
  updatedAt:    Date;
}

const UserSchema = new Schema<UserDoc>(
  {
    firstName:    { type: String, required: true },
    lastName:     { type: String, required: true },
    email:        { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role:         { type: String, enum: ['super-admin','branch-admin','staff','trainer'], default: 'staff' },
  },
  { timestamps: true }
);

export const UserModel: Model<UserDoc> = mongoose.model<UserDoc>('User', UserSchema);
