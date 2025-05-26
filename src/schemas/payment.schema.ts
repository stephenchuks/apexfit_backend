// src/schemas/payment.schema.ts
import { z } from 'zod';

export const PaymentCreateSchema = z.object({
  memberId:      z.string().length(24, 'Invalid member ID'),
  amount:        z.number().min(0, 'Amount must be non-negative'),
  method:        z.enum(['Cash','Bank Transfer','Credit Card','Other']),
  date:          z.string().refine((d) => !isNaN(Date.parse(d)), { message: 'Invalid date' }),
  periodCovered: z.enum(['Monthly','Quarterly','Annual']),
});

export const PaymentUpdateSchema = PaymentCreateSchema.partial();

export type PaymentCreateInput = z.infer<typeof PaymentCreateSchema>;
export type PaymentUpdateInput = z.infer<typeof PaymentUpdateSchema>;
