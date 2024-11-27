'use server';

import { fetchAction } from '@/lib/fetch';
import {
  $CourseClassAssignmentAPI,
  $PersonalAssignmentAPI,
  $UserAPI as userAPI,
} from 'lms-types';
import { actionClient } from '@/lib/action-client';
import { handleError, PWAError } from '@/lib/error';
import { env } from '@/env';
import { verifySession } from '@/lib/session';
import {
  addAssignmentSchema,
  addPersonalAssignmentSchema,
  deleteAssignmentSchema,
  updateAssignmentSchema,
  updatePersonalAssignmentSchema,
} from '@/lib/schema';
import { flattenValidationErrors } from 'next-safe-action';
import { cookieGenerator } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

type getUserAssignmentsRT = userAPI.GetUserAssignments.Response['data'];

export const getUserAssignment = fetchAction<getUserAssignmentsRT>(
  '/users/:userId/assignments',
  'Failed to fetch assignments'
);

export const getAssignments = async (courseId: number, classId: number) =>
  await fetchAction<$CourseClassAssignmentAPI.GetAssignments.Response['data']>(
    $CourseClassAssignmentAPI.GetAssignments.generateUrl(courseId, classId)
  )();

export const createPersonalAssignment = actionClient
  .metadata({ actionName: 'createPersonalAssignment' })
  .schema(addPersonalAssignmentSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { userId } = await verifySession();
    const bodyInput: $PersonalAssignmentAPI.CreateAssignment.Dto = {
      ...parsedInput,
    };
    try {
      const { refresh_token, access_token } = await verifySession();
      const res = await fetch(
        env.API_URL +
          $PersonalAssignmentAPI.CreateAssignment.generateUrl(userId),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookieGenerator(access_token, refresh_token),
          },
          body: JSON.stringify(bodyInput),
        }
      );

      const { data, error } = await res.json();

      if (!res.ok) {
        return handleError(error);
      }

      revalidatePath('/assignments');

      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new PWAError(err.message);
      }
      throw new PWAError('Failed to create personal assignment');
    }
  });

export const updateAssignment = actionClient
  .metadata({ actionName: 'updateAssignment' })
  .schema(updateAssignmentSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { userId } = await verifySession();
    const { courseId, assignmentId, classId, ...otherInput } = parsedInput;
    const bodyInput: $CourseClassAssignmentAPI.CreateAssignment.Dto = {
      ...otherInput,
    };

    try {
      const { refresh_token, access_token } = await verifySession();
      const res = await fetch(
        env.API_URL +
          $CourseClassAssignmentAPI.UpdateAssignment.generateUrl(
            Number(courseId),
            Number(classId),
            Number(assignmentId)
          ),
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookieGenerator(access_token, refresh_token),
          },
          body: JSON.stringify(bodyInput),
        }
      );

      const { data, error } = await res.json();

      if (!res.ok) {
        return handleError(error);
      }

      revalidatePath('/assignments');

      return data as $CourseClassAssignmentAPI.UpdateAssignment.Response['data'];
    } catch (err) {
      if (err instanceof Error) {
        throw new PWAError(err.message);
      }
      throw new PWAError('Failed to update assignment');
    }
  });

export const updatePersonalAssignment = actionClient
  .metadata({ actionName: 'updatePersonalAssignment' })
  .schema(updatePersonalAssignmentSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { userId } = await verifySession();
    const { assignmentId, ...otherInput } = parsedInput;
    const bodyInput: $PersonalAssignmentAPI.CreateAssignment.Dto = {
      ...otherInput,
    };

    try {
      const { refresh_token, access_token } = await verifySession();
      const res = await fetch(
        env.API_URL +
          $PersonalAssignmentAPI.UpdateAssignment.generateUrl(
            userId,
            Number(assignmentId)
          ),
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookieGenerator(access_token, refresh_token),
          },
          body: JSON.stringify(bodyInput),
        }
      );

      const { data, error } = await res.json();
      if (!res.ok) {
        return handleError(error);
      }

      revalidatePath('/assignments');

      return data as $PersonalAssignmentAPI.UpdateAssignment.Response['data'];
    } catch (err) {
      if (err instanceof Error) {
        throw new PWAError(err.message);
      }
      throw new PWAError('Failed to update assignment');
    }
  });

export const createAssignment = actionClient
  .metadata({ actionName: 'createAssignment' })
  .schema(addAssignmentSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { courseId, classId, ...otherInput } = parsedInput;
    const bodyInput: $CourseClassAssignmentAPI.CreateAssignment.Dto = {
      ...otherInput,
    };

    try {
      const { refresh_token, access_token } = await verifySession();
      const res = await fetch(
        env.API_URL +
          $CourseClassAssignmentAPI.CreateAssignment.generateUrl(
            Number(courseId),
            Number(classId)
          ),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookieGenerator(access_token, refresh_token),
          },
          body: JSON.stringify(bodyInput),
        }
      );

      const { data, error } = await res.json();
      if (error) {
        return handleError(error);
      }

      revalidatePath('/assignments');

      return data as $CourseClassAssignmentAPI.CreateAssignment.Response['data'];
    } catch (err) {
      if (err instanceof Error) {
        throw new PWAError(err.message);
      }
      throw new PWAError('Failed to create assignment');
    }
  });

export const deleteAssignment = actionClient
  .metadata({ actionName: 'deleteAssignment' })
  .schema(deleteAssignmentSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { courseId, classId, assignmentId } = parsedInput;
    try {
      const { refresh_token, access_token } = await verifySession();
      const res = await fetch(
        env.API_URL +
          $CourseClassAssignmentAPI.DeleteAssignment.generateUrl(
            courseId,
            classId,
            assignmentId
          ),
        {
          method: 'DELETE',
          headers: {
            Cookie: cookieGenerator(access_token, refresh_token),
          },
        }
      );
      const { data, error } = await res.json();
      if (!res.ok) {
        return handleError(error);
      }
      revalidatePath('/portal/atur-atur/assignments');
      return data as $CourseClassAssignmentAPI.DeleteAssignment.Response['data'];
    } catch (err) {
      if (err instanceof Error) {
        throw new PWAError(err.message);
      }
      throw new PWAError('Failed to delete assignment');
    }
  });

export const getAssignmentById = async (
  courseId: number,
  classId: number,
  assignmentId: number
) =>
  await fetchAction<
    $CourseClassAssignmentAPI.GetAssignmentById.Response['data']
  >(
    $CourseClassAssignmentAPI.GetAssignmentById.generateUrl(
      courseId,
      classId,
      assignmentId
    )
  )();
