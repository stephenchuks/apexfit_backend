import { z } from 'zod';

export const CheckInCreateSchema = z.object({
  memberId:  z.string().length(24),
  branchId:  z.string().length(24),
  timestamp: z.string().optional(),
});

export type CheckInCreateInput = z.infer<typeof CheckInCreateSchema>;
