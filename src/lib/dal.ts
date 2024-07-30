import { cache } from 'react';
import { updateSession, verifySession } from './session';
import { env } from '@/env';
import { handleError } from './error';

export const getAccessToken = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  return session.access_token;
});

export const getRefreshToken = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  return session.refresh_token;
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session.isAuth) return null;

  try {
    const data = await fetch(env.API_URL + `/users/${session.userId}/public`);

    if (!data.ok) {
      throw new Error('Error fetching user data');
    }

    const user = await data.json();

    if (user.error) {
      throw new Error(user.error);
    }

    return user;
  } catch (err) {
    throw new Error('Error fetching user data');
  }
});

export const getFullUser = cache(async () => {
  const session = await verifySession();
  if (!session.isAuth) return null;

  try {
    const res = await fetch(env.API_URL + `/users/me`, {
      headers: {
        Cookie: `accessToken=${session.access_token}`,
      },
    });

    const { error, data } = await res.json();
    if (!res.ok || error) {
      return handleError(error);
    }

    void updateSession(res);

    return data;
  } catch (err) {
    throw new Error('Error fetching user data');
  }
});
