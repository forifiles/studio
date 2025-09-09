import { z } from 'zod';
import type { Timestamp } from 'firebase/firestore';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export type SignUpForm = z.infer<typeof signUpSchema>;


// Database Types
export type PurchaseStatus = 'pending' | 'active' | 'expired' | 'cancelled';

export type Purchase = {
  id?: string;
  userId: string;
  userEmail: string;
  policyName: string;
  premium: string;
  purchaseDate: Timestamp;
  status: PurchaseStatus;
  formData: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    idType: string;
    idNumber: string;
    idExpiry?: Timestamp;
    idImageUrl: string;
  };
  paymentReference: string;
}

export type InsurancePlan = {
  id?: string;
  name: string;
  provider: string;
  description: string;
  premium: number;
  coverage: string[];
  exclusions: string[];
}

export type UserRole = 'admin' | 'user';

export type UserProfile = {
  uid: string;
  email: string;
  role: UserRole;
  createdAt: Timestamp;
};
