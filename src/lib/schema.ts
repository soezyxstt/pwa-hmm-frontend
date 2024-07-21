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

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Fullname must be at least 3 characters' }),
    email: z
      .string()
      .email()
      .regex(/[0-9]{8}@mahasiswa.itb.ac.id$/, {
        message: 'Email must be ITB student email',
      }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
