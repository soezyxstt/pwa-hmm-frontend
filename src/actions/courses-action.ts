'use server';

import { env } from '@/env';
import { handleError } from '@/lib/error';
import { updateSession, verifySession } from '@/lib/session';
import { cache } from 'react';

export const getEnrolledCourses = cache(async () => {
  try {
    const session = await verifySession();
    const res = await fetch(
      env.API_URL +
        '/courses/enrolled?include_author=true&include_category=false&limit_student_courses=5&limit_instructor_courses=5&role[]=STUDENT',
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`,
        },
      }
    );

    const { error, data } = await res.json();
    if (!res.ok || error) {
      return handleError(error);
    }

    void updateSession(res);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error('Failed to fetch courses');
  }
});

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

export const getLessons = cache(async (id: string) => {
  if (!id) {
    return null;
  }

  const session = await verifySession();

  if (!session.isAuth) {
    throw new Error('Unauthorized');
  }

  try {
    const res = await fetch(env.API_URL + `/courses/${id}/lessons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`,
      },
    });

    const { error, data } = await res.json();
    if (!res.ok || error) {
      return handleError(error);
    }

    void updateSession(res);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error('Failed to fetch lessons');
  }
});

export const getVideos = cache(
  async (courseId: string | number, lessonId: string | number) => {
    const session = await verifySession();

    const res = await fetch(
      env.API_URL + `/courses/${courseId}/lessons/${lessonId}/videos`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`,
        },
      }
    );

    const { error, data } = await res.json();
    if (!res.ok || error) {
      return handleError(error);
    }

    void updateSession(res);

    return data;
  }
);
