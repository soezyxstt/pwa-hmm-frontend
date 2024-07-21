'use server';

import { env } from '@/env';
import { actionClient } from '@/lib/action-client';
import { verifySession } from '@/lib/session';

export async function courses() {
  try {
    const session = await verifySession();
    const res = await fetch(env.API_URL + '/courses?include_author=true&include_category=false&pageSize=5&pageNumber=1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`,
      },
    });

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