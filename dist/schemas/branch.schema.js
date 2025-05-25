import { z } from 'zod';
export const BranchCreateSchema = z.object({
    name: z.string().min(3, 'Branch name must be at least 3 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    contactEmail: z.string().email('Invalid email address'),
    phoneNumber: z.string().min(7, 'Phone number too short'),
});
export const BranchUpdateSchema = BranchCreateSchema.partial();
