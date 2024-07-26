'use server';

import { env } from '@/env';
import { verifySession } from '@/lib/session';

export async function courses() {
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

    console.log(res);

    if (!res.ok) {
      throw new Error('Failed to fetch courses');
    }
    const { data } = await res.json();
    
    return data;
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error('Failed to fetch courses');
  }
}
