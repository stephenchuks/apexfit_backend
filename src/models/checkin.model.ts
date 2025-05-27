import mongoose, { Schema, Document, Model } from 'mongoose';

export interface CheckInDoc extends Document {
  memberId:  mongoose.Types.ObjectId;
  branchId:  mongoose.Types.ObjectId;
  timestamp: Date;
}

const CheckInSchema = new Schema<CheckInDoc>(
  {
    memberId:  { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    branchId:  { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    timestamp: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

export const CheckInModel: Model<CheckInDoc> = mongoose.model<CheckInDoc>(
  'CheckIn',
  CheckInSchema
)