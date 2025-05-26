import { PaymentModel, PaymentDoc } from '../models/payment.model.js';
import { PaymentCreateInput, PaymentUpdateInput } from '../schemas/payment.schema.js';

export const PaymentRepo = {
  async create(data: PaymentCreateInput): Promise<PaymentDoc> {
    const payment = new PaymentModel({
      ...data,
      date: new Date(data.date),
    });
    return payment.save();
  },

  async findAll(): Promise<PaymentDoc[]> {
    return PaymentModel.find().sort({ date: -1 }).exec();
  },

  async findById(id: string): Promise<PaymentDoc | null> {
    return PaymentModel.findById(id).exec();
  },

  async update(id: string, data: PaymentUpdateInput): Promise<PaymentDoc | null> {
    if (data.date) (data as any).date = new Date((data as any).date);
    return PaymentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  },

  async remove(id: string): Promise<PaymentDoc | null> {
    return PaymentModel.findByIdAndDelete(id).exec();
  },

  async findByMember(memberId: string): Promise<PaymentDoc[]> {
    return PaymentModel.find({ memberId }).sort({ date: -1 }).exec();
  },
};
