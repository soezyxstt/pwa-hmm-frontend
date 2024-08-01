import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  // .regex(/[0-9]{8}@mahasiswa.itb.ac.id$/,
  // {
  //   message: 'Email must be ITB student email',
  // }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const signOutSchema = z.object({});

export const signUpSchema = z
  .object({
    name: z.string().min(3, { message: 'Input at least 3 characters' }),
    email: z
      .string()
      .email()
      .regex(/[0-9]{8}@mahasiswa.itb.ac.id$/, {
        message: 'Must be ITB student email',
      }),
    password: z.string().min(8, { message: 'Input at least 8 characters' }),
    confirmPassword: z.string(),
    address: z.string(),
    phone: z.string().refine((value) => value.startsWith('08'), {message: 'Must start with 08'}),
    dateOfBirth: z.string(),
    lineId: z.string(),
    bloodType: z.enum(['A', 'B', 'AB', 'O'], { message: 'Invalid blood type' }),
    medicalHistory: z.string(),
    emergencyNumber: z.string().refine((value) => value.startsWith('08'), {message: 'Must start with 08'}),
    hobby: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
