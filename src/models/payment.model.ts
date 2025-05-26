// src/models/payment.model.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface PaymentDoc extends Document {
  memberId:      mongoose.Types.ObjectId;
  amount:        number;
  method:        string;
  date:          Date;
  periodCovered: string;
  createdAt:     Date;
  updatedAt:     Date;
}

const PaymentSchema = new Schema<PaymentDoc>(
  {
    memberId:      { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    amount:        { type: Number, required: true },
    method:        { type: String, required: true },
    date:          { type: Date,   required: true },
    periodCovered: { type: String, required: true },
  },
  { timestamps: true },
);

export const PaymentModel: Model<PaymentDoc> = mongoose.model<PaymentDoc>(
  'Payment',
  PaymentSchema
);
