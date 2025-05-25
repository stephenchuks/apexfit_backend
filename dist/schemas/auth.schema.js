import { z } from 'zod';
export const RegisterSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be 8+ chars'),
    role: z.enum(['super-admin', 'branch-admin', 'staff', 'trainer']).optional(),
});
export const LoginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password required'),
});
