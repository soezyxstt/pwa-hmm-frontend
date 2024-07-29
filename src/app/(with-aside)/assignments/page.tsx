import { cache } from 'react';
import AssingmentPage from './assignment';
import { verifySession } from '@/lib/session';
import { env } from '@/env';

const getAssignments = cache(async () => {
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
    )

    if (!res.ok) {
      throw new Error('Failed to fetch assignments');
    }

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
});

export default async function Page() {
  const assignments = await getAssignments();
  return (
    <>
      <AssingmentPage assignments={assignments} />
    </>
  );
}

export const metadata = {
  title: 'Assignments',
};
