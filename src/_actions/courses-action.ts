'use server';

import { cache } from 'react';
import { fetchAction } from '@/lib/fetch';
import {
  $UserAPI as userAPI,
  $CourseAPI as courseAPI,
  $CourseLessonAPI as lessonAPI,
  $CourseLessonVideoAPI as videoAPI,
} from 'lms-types';
import { actionClient } from '@/lib/action-client';
import { addCourseSchema, deleteCourseSchema } from '@/lib/schema';
import { flattenValidationErrors } from 'next-safe-action';

export const getEnrolledCourses = fetchAction<
  userAPI.GetUserEnrolledCourses.Response['data']
>(
  userAPI.GetUserEnrolledCourses.generateUrl(':userId'),
  'Failed to fetch courses'
);

export const getCourses = fetchAction<courseAPI.GetCourses.Response['data']>(
  courseAPI.GetCourses.generateUrl(),
  'Failed to fetch courses',
  {
    queryParams: {
      include_category: true,
      pageSize: 999,
      pageNumber: 1,
    },
  }
);

export const getLessons = async (courseId: string) =>
  await fetchAction<lessonAPI.GetLessons.Response['data']>(
    lessonAPI.GetLessons.generateUrl(Number(courseId)),
    'Failed to fetch lessons'
  )();

export const getVideos = async (
  courseId: string | number,
  lessonId: string | number
) =>
  await fetchAction<videoAPI.GetVideos.Response['data']>(
    videoAPI.GetVideos.generateUrl(Number(courseId), Number(lessonId)),
    'Failed to fetch videos'
  )();

export const getVideoData = cache(async (videoId: string) => {
  const res = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    { cache: 'force-cache' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch video data');
  }

  return res.json();
});

export const getCourseEnrollmentStatus = async (courseId: string) =>
  await fetchAction<
    userAPI.GetUserCourseEnrollmentStatusByCourseId.Response['data']
  >(
    userAPI.GetUserCourseEnrollmentStatusByCourseId.generateUrl(
      ':userId',
      Number(courseId)
    ),
    'Failed to fetch course enrollment status',
    { logResponse: true, logData: true }
  )();

export const deleteCourse = actionClient
  .metadata({
    actionName: 'deleteCourse',
  })
  .schema(deleteCourseSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { courseId } }) => {
    const res = await fetchAction<courseAPI.DeleteCourse.Response['data']>(
      courseAPI.DeleteCourse.generateUrl(courseId),
      'Failed to delete course'
    )();
    return res;
  });

export const createCourse = actionClient
  .metadata({
    actionName: 'createCourse',
  })
  .schema(addCourseSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const res = await fetchAction<courseAPI.CreateCourse.Response['data']>(
      courseAPI.CreateCourse.generateUrl(),
      'Failed to create course',
      {
        method: 'POST',
        bodyObject: parsedInput,
      }
    )();
    return res;
  });