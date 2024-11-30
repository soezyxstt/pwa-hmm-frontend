'use server';

import { put } from '@vercel/blob';
import { actionClient } from '@/lib/action-client';
import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';
import { handleError } from '@/lib/error';

// Change the schema to accept FormData instead of File
const uploadImageSchema = z.object({
  file: z.instanceof(FormData)
});

export const uploadProfileImage = actionClient
  .metadata({
    actionName: 'uploadProfileImage',
  })
  .schema(uploadImageSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    try {
      const file = parsedInput.file.get('file') as File;
      if (!file) {
        throw new Error('No file provided');
      }

      // Generate a unique pathname
      const pathname = `profiles/${Date.now()}-${file.name}`;
      
      const { url } = await put(pathname, file, {
        access: 'public',
      });

      return url;
    } catch (error) {
      handleError(error);
    }
  });

// Add new action for course images
export const uploadCourseImage = actionClient
  .metadata({
    actionName: 'uploadCourseImage',
  })
  .schema(uploadImageSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    try {
      const file = parsedInput.file.get('file') as File;
      if (!file) {
        throw new Error('No file provided');
      }

      // Generate a unique pathname
      const pathname = `courses/${Date.now()}-${file.name}`;
      
      const { url } = await put(pathname, file, {
        access: 'public',
      });

      return url;
    } catch (error) {
      handleError(error);
    }
  });

// Add new action for scholarship images
export const uploadScholarshipImage = actionClient
  .metadata({
    actionName: 'uploadScholarshipImage',
  })
  .schema(uploadImageSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    try {
      const file = parsedInput.file.get('file') as File;
      if (!file) {
        throw new Error('No file provided');
      }

      // Generate a unique pathname
      const pathname = `scholarships/${Date.now()}-${file.name}`;
      
      const { url } = await put(pathname, file, {
        access: 'public',
      });

      return url;
    } catch (error) {
      handleError(error);
    }
  });

