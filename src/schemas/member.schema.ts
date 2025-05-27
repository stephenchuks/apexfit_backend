import { z } from 'zod';

export const MemberCreateSchema = z.object({
  firstName:   z.string().min(1),
  lastName:    z.string().min(1),
  email:       z.string().email(),
  phoneNumber: z.string().min(7),
  branchId:    z.string().length(24),
  joinDate:    z.string().optional(),        // allow override if desired
  isActive:    z.boolean().optional(),
  status:      z.enum(['active','inactive']).optional(),
});
export const MemberUpdateSchema = MemberCreateSchema.partial();

export type MemberCreateInput = z.infer<typeof MemberCreateSchema>;
export type MemberUpdateInput = z.infer<typeof MemberUpdateSchema>;
