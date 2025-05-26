import createHttpError from 'http-errors';
import { PaymentRepo } from '../repositories/payment.repository.js';
import { PaymentCreateInput, PaymentUpdateInput } from '../schemas/payment.schema.js';

export class PaymentService {
  static async createPayment(input: PaymentCreateInput) {
    return PaymentRepo.create(input);
  }

  static async listPayments() {
    return PaymentRepo.findAll();
  }

  static async getPaymentById(id: string) {
    const payment = await PaymentRepo.findById(id);
    if (!payment) {
      throw new createHttpError.NotFound(`Payment with id ${id} not found`);
    }
    return payment;
  }

  static async updatePayment(id: string, input: PaymentUpdateInput) {
    const updated = await PaymentRepo.update(id, input);
    if (!updated) {
      throw new createHttpError.NotFound(`Payment with id ${id} not found`);
    }
    return updated;
  }

  static async deletePayment(id: string) {
    const deleted = await PaymentRepo.remove(id);
    if (!deleted) {
      throw new createHttpError.NotFound(`Payment with id ${id} not found`);
    }
    return deleted;
  }

  static async listPaymentsByMember(memberId: string) {
    return PaymentRepo.findByMember(memberId);
  }
}
