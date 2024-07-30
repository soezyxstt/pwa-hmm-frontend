'use server';

import { env } from '@/env';
import { handleError } from '@/lib/error';
import { updateSession, verifySession } from '@/lib/session';
import { cache } from 'react';

export const getAssignments = cache(async () => {
  'use server';
  try {
    const session = await verifySession();

    const res = await fetch(
      env.API_URL + `/users/${session.userId}/assignments`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`,
        },
      }
    );

    const {error, data} = await res.json();
    if (!res.ok || error) {
      return handleError(error);
    }

    void updateSession(res);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('Failed to fetch assignments');
  }
});
