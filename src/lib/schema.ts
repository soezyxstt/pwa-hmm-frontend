import { z } from 'zod';
import {
  AssignmentCompletionStatusModel,
  AssignmentTaskTypeModel,
  CourseStatusModel,
  ScholarshipFundingModel,
} from 'lms-types';

// enum
export const submissionsEnum: [string, ...string[]] = [
  'ms-teams',
  'edunex',
  'on-site',
  'g-drive',
];

// auth schema
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  // .regex(/[0-9]{8}@mahasiswa.itb.ac.id$/,
  // {
  //   message: 'Email must be ITB student email',
  // }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const userSchema = z.object({
  name: z.string().min(4, { message: 'Name must be at least 4 characters' }),
  email: z.string().email({ message: 'Invalid email format' }),
  address: z.string().min(4, { message: 'Address must be at least 4 characters' }),
  phoneNumber: z.string().min(10, { message: 'Invalid phone number' }),
  dateOfBirth: z.string(),
  lineId: z.string().min(4, { message: 'Line ID must be at least 4 characters' }),
  bloodType: z.string().max(3, { message: 'Invalid blood type' }),
  emergencyNumber: z.string().min(10, { message: 'Invalid emergency number' }),
  medicalHistories: z.array(z.string()),
  hobbies: z.array(z.string()),
  UKM: z.array(z.string()),
});

export const signUpSchema = userSchema.extend({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const editProfileSchema = z.object({
  name: z.string().min(4, { message: 'Name must be at least 4 characters' }),
  email: z.string().email({ message: 'Invalid email format' }),
  address: z.string().min(4, { message: 'Address must be at least 4 characters' }),
  phoneNumber: z.string().min(10, { message: 'Invalid phone number' }),
  dateOfBirth: z.string(),
  lineId: z.string().min(4, { message: 'Line ID must be at least 4 characters' }),
  bloodType: z.string().max(3, { message: 'Invalid blood type' }),
  emergencyNumber: z.string().min(10, { message: 'Invalid emergency number' }),
  medicalHistories: z.array(z.string()),
  hobbies: z.array(z.string()),
  UKM: z.array(z.string()),
});

// assignment schema
export const addPersonalAssignmentSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  course: z.string().min(1, { message: 'Course is required' }),
  deadline: z.date({
    required_error: 'Deadline is required',
    invalid_type_error: 'Invalid date format',
  }),
  submission: z.string().min(1, { message: 'Submission method is required' }),
  description: z.string().optional(),
  taskType: z.enum(['PERSONAL_TASK', 'GROUP_TASK'], {
    required_error: 'Task type is required',
  }),
  completionStatus: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'DONE'], {
    required_error: 'Completion status is required',
  }),
});

export const addAssignmentSchema = z.object({
  title: z.string().min(3, { message: 'Input at least 3 characters' }),
  deadline: z.string().refine((val) => new Date(val) > new Date(), {
    message: 'Deadline must be in the future',
  }),
  submission: z.enum(submissionsEnum, { message: 'Invalid submission method' }),
  description: z.string().optional(),
  taskType: z.nativeEnum(AssignmentTaskTypeModel, {
    message: 'Invalid task type',
  }),
  classId: z
    .number({ message: 'Class ID must be a number' })
    .min(1, { message: 'Class ID must be at least 1' }),
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
});

export const updateAssignmentSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Input at least 3 characters' })
    .optional(),
  submission: z
    .enum(submissionsEnum, { message: 'Invalid submission method' })
    .optional(),
  deadline: z.date({ message: 'Invalid date format' }).optional(),
  description: z.string().optional(),
  taskType: z
    .nativeEnum(AssignmentTaskTypeModel, { message: 'Invalid task type' })
    .optional(),
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
  classId: z
    .number({ message: 'Class ID must be a number' })
    .min(1, { message: 'Class ID must be at least 1' }),
  assignmentId: z
    .number({ message: 'Assignment ID must be a number' })
    .min(1, { message: 'Assignment ID must be at least 1' }),
});

export const updatePersonalAssignmentSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Input at least 3 characters' })
    .optional(),
  submission: z
    .enum(submissionsEnum, { message: 'Invalid submission method' })
    .optional(),
  deadline: z.date({ message: 'Invalid date format' }).optional(),
  description: z.string().optional(),
  taskType: z
    .nativeEnum(AssignmentTaskTypeModel, { message: 'Invalid task type' })
    .optional(),
  course: z.string().optional(),
  completionStatus: z
    .nativeEnum(AssignmentCompletionStatusModel, {
      message: 'Invalid completion status',
    })
    .optional(),
  assignmentId: z
    .number({ message: 'Assignment ID must be a number' })
    .min(1, { message: 'Assignment ID must be at least 1' }),
});

export const deleteAssignmentSchema = z.object({
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
  classId: z
    .number({ message: 'Class ID must be a number' })
    .min(1, { message: 'Class ID must be at least 1' }),
  assignmentId: z
    .number({ message: 'Assignment ID must be a number' })
    .min(1, { message: 'Assignment ID must be at least 1' }),
});

// course schema
export const addCourseSchema = z.object({
  code: z.string().min(1, { message: 'Code is required' }),
  image: z.union([z.literal(''), z.string().url({ message: 'Invalid image URL' }).optional()]),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  status: z.nativeEnum(CourseStatusModel, { message: 'Invalid status' }),
  categoryId: z.union([ z.literal(""), z.number({ message: 'Category ID must be a number' }).optional()]),
});
export const deleteCourseSchema = z.object({
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
});

// completion schema
export const updateCompletionSchema = z.object({
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
  classId: z
    .number({ message: 'Class ID must be a number' })
    .min(1, { message: 'Class ID must be at least 1' }),
  assignmentId: z
    .number({ message: 'Assignment ID must be a number' })
    .min(1, { message: 'Assignment ID must be at least 1' }),
  completionId: z
    .number({ message: 'Completion ID must be a number' })
    .min(1, { message: 'Completion ID must be at least 1' }),
  completionStatus: z.nativeEnum(AssignmentCompletionStatusModel, {
    message: 'Invalid completion status',
  }),
});

export const createCompletionSchema = z.object({
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
  classId: z
    .number({ message: 'Class ID must be a number' })
    .min(1, { message: 'Class ID must be at least 1' }),
  assignmentId: z
    .number({ message: 'Assignment ID must be a number' })
    .min(1, { message: 'Assignment ID must be at least 1' }),
  completionStatus: z.nativeEnum(AssignmentCompletionStatusModel, {
    message: 'Invalid completion status',
  }),
});

export const deleteCompletionSchema = z.object({
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
  classId: z
    .number({ message: 'Class ID must be a number' })
    .min(1, { message: 'Class ID must be at least 1' }),
  assignmentId: z
    .number({ message: 'Assignment ID must be a number' })
    .min(1, { message: 'Assignment ID must be at least 1' }),
  completionId: z
    .number({ message: 'Completion ID must be a number' })
    .min(1, { message: 'Completion ID must be at least 1' }),
});

// class schema
// Class schemas
export const addClassSchema = z.object({
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  description: z.string().optional(),
  startTime: z.date({ message: 'Invalid start time format' }),
  endTime: z.date({ message: 'Invalid end time format' }),
  day: z.string().min(1, { message: 'Day is required' }),
  room: z.string().min(1, { message: 'Room is required' }),
});

export const updateClassSchema = z.object({
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
  classId: z
    .number({ message: 'Class ID must be a number' })
    .min(1, { message: 'Class ID must be at least 1' }),
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }).optional(),
  description: z.string().optional(),
  startTime: z.date({ message: 'Invalid start time format' }).optional(),
  endTime: z.date({ message: 'Invalid end time format' }).optional(),
  day: z.string().min(1, { message: 'Day is required' }).optional(),
  room: z.string().min(1, { message: 'Room is required' }).optional(),
});

export const deleteClassSchema = z.object({
  courseId: z
    .number({ message: 'Course ID must be a number' })
    .min(1, { message: 'Course ID must be at least 1' }),
  classId: z
    .number({ message: 'Class ID must be a number' })
    .min(1, { message: 'Class ID must be at least 1' }),
});

// event schemas
export const addEventSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  date: z.date({ message: 'Invalid date format' })
});

export const updateEventSchema = z.object({
  id: z.number({ message: 'Event ID must be a number' })
    .min(1, { message: 'Event ID must be at least 1' }),
  title: z.string().min(1, { message: 'Title is required' }).optional(),
  description: z.string().optional(),
  date: z.date({ message: 'Invalid date format' }).optional()
});

export const deleteEventSchema = z.object({
  eventId: z.number({ message: 'Event ID must be a number' })
    .min(1, { message: 'Event ID must be at least 1' })
});

import { UserRoleModel } from 'lms-types';

// Update email schema
export const updateEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
});

// Update password schema
export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Update role schema
export const updateRoleSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required' }),
  role: z.nativeEnum(UserRoleModel, {
    message: 'Invalid role',
  }),
});

// Delete user schema
export const deleteUserSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required' }),
});

// Add these with other schemas
export const addScholarshipSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().optional(),
  provider: z.string().min(1, { message: 'Provider is required' }),
  deadline: z.date({
    required_error: 'Deadline is required',
    invalid_type_error: 'Invalid date format',
  }),
  reference: z.string().url({ message: 'Must be a valid URL' }),
  funding: z.enum(['PARTIALLY_FUNDED', 'FULLY_FUNDED'] as const, {
    message: 'Invalid funding type',
  }),
  scope: z.string().min(1, { message: 'Scope is required' }),
});

export const updateScholarshipSchema = z.object({
  scholarshipId: z.number().min(1, { message: 'Scholarship ID is required' }),
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }).optional(),
  description: z.string().optional(),
  provider: z.string().min(1, { message: 'Provider is required' }).optional(),
  deadline: z.date().optional(),
  reference: z.string().url({ message: 'Must be a valid URL' }).optional(),
  funding: z.enum(['PARTIALLY_FUNDED', 'FULLY_FUNDED'] as const, {
    message: 'Invalid funding type',
  }).optional(),
  scope: z.string().min(1, { message: 'Scope is required' }).optional(),
});

export const deleteScholarshipSchema = z.object({
  scholarshipId: z.number().min(1, { message: 'Scholarship ID is required' }),
});