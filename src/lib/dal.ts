import { cache } from 'react';
import { verifySession } from './session';
import { env } from '@/env';

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
    const user = await data.json();

    return user;
  } catch (err) {
    console.log("Error fetching user data");
    return null;
  }
});

export const getUserId = cache(async () => {
  const session = await verifySession();
  if (!session.isAuth) return null

  try {
    const data = await fetch(env.API_URL + '/users/me', {
      headers: {
        Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`,
      }
    })

    return (await data.json()).data.id;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }

    return null
  }
});

export const getFullUser = cache(async () => {
  const session = await verifySession();
  if (!session.isAuth) return null;

  try {
    const data = await fetch(env.API_URL + `/users/me`, {
      headers: {
        Cookie: `accessToken=${session.access_token}`,
      }
    });

    console.log(data);

    const user = await data.json();

    return user;
  } catch (err) {
    console.log("Error fetching user data");
    return null;
  }
});