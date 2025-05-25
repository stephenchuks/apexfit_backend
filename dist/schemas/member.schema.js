import { z } from 'zod';
export const MemberCreateSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(7, 'Phone number too short'),
    branchId: z.string().length(24, 'Invalid branch ID'),
    startDate: z.string().refine(d => !isNaN(Date.parse(d)), { message: 'Invalid date' }),
});
export const MemberUpdateSchema = MemberCreateSchema.partial();
