import { z } from 'zod';

export const submissionsEnum: [string, ...string[]] = ['MS Teams', 'Edunex', 'WhatsApp', 'GDrive'];

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
    name: z.string().min(3, { message: 'Input at least 3 characters' }),
    email: z
      .string()
      .email()
      .regex(/131[0-9]{5}@mahasiswa.itb.ac.id$/, {
        message: 'Must be ITB student email',
      }),
    password: z.string().min(8, { message: 'Input at least 8 characters' }),
    confirmPassword: z.string(),
    address: z.string().min(3, { message: 'Input at least 3 characters' }),
    phoneNumber: z.string().min(9, {message: "Input at least 9 characters"}).refine((value) => value.startsWith('08'), {message: 'Must start with 08'}),
    dateOfBirth: z.string(),
    lineId: z.string(),
    bloodType: z.enum(['A', 'B', 'AB', 'O'], { message: 'Invalid blood type' }),
    medicalHistories: z.array(z.string().min(3, { message: 'Input at least 3 characters' })).optional(),
    emergencyNumber: z.string().min(9, {message: "Input at least 9 characters"}).refine((value) => value.startsWith('08'), {message: 'Must start with 08'}),
    hobbies: z.array(z.string().min(3, { message: 'Input at least 3 characters' })).optional(),
    UKM: z.array(z.string().min(3, { message: 'Input at least 3 characters' })).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.emergencyNumber !== data.phoneNumber, {
    message: 'Emergency number must be different from phone number',
    path: ['emergencyNumber'],
  });

export const addAssignmentSchema = z.object({
  submissions: z.enum(submissionsEnum, { message: 'Invalid submission method' }),
  title: z.string().min(3, { message: 'Input at least 3 characters' }),
  deadline: z.string(),
  classId: z.string(),
})