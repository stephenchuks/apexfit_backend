import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { PaymentService } from '../services/payment.service.js';
import { PaymentCreateSchema, PaymentUpdateSchema } from '../schemas/payment.schema.js';

export const PaymentController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input = PaymentCreateSchema.parse(req.body);
      const payment = await PaymentService.createPayment(input);
      res.status(201).json(payment);
      return;
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ errors: err.flatten() });
        return;
      }
      next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payments = await PaymentService.listPayments();
      res.json(payments);
      return;
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payment = await PaymentService.getPaymentById(req.params.id);
      res.json(payment);
      return;
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input = PaymentUpdateSchema.parse(req.body);
      const updated = await PaymentService.updatePayment(req.params.id, input);
      res.json(updated);
      return;
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ errors: err.flatten() });
        return;
      }
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await PaymentService.deletePayment(req.params.id);
      res.status(204).end();
      return;
    } catch (err) {
      next(err);
    }
  },

  async listByMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payments = await PaymentService.listPaymentsByMember(req.params.memberId);
      res.json(payments);
      return;
    } catch (err) {
      next(err);
    }
  },
};
