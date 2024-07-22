'use server';

import { env } from '@/env';
import { actionClient } from '@/lib/action-client';
import { signInSchema, signOutSchema, signUpSchema } from '@/lib/schema';
import { createSession, deleteSession, verifySession } from '@/lib/session';
import { flattenValidationErrors } from 'next-safe-action';

export const signUp = actionClient
  .schema(signUpSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { name, email, password } }) => {
    try {
      const res = await fetch(env.API_URL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          NIM: email.split('@')[0],
        }),
      });

      console.log(res);

      if (!res.ok) {
        throw new Error('Failed to sign up');
      }

      return {
        message: 'User created successfully',
        status: 'success',
      };
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        throw new Error(err.message);
      }

      throw new Error('Failed to sign up');
    }
  });

export const signIn = actionClient
  .schema(signInSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const res = await fetch(env.API_URL + '/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log(res);

      const set_cookies = res.headers.get('set-cookie')?.split('=');
      const access_token = set_cookies?.[1].split(';')[0];
      const refresh_token = set_cookies?.[5].split(';')[0];

      const data = await fetch(env.API_URL + '/users/me', {
        headers: {
          Cookie: `accessToken=${access_token}; refreshToken=${refresh_token}`,
        },
      });

      const {
        data: { id },
      } = await data.json();

      if (!res.ok || !access_token || !refresh_token) {
        throw new Error('Failed to sign in');
      }

      createSession(id, access_token, refresh_token);
      return {
        message: 'User signed in successfully',
        status: 'success',
        redirect: true,
      };
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        throw new Error(err.message);
      }

      throw new Error('Failed to sign in');
    }
  });

export async function signOut() {
  try {
    const session = await verifySession();

    if (!session.isAuth) {
      return {
        status: 'unauthenticated',
      };
    }

    deleteSession();

    const res = await fetch(env.API_URL + '/users/signout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`,
      },
    });

    console.log(res);

    if (!res.ok) {
      throw new Error('Failed to sign out');
    }

    return {
      status: 'success',
    };
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      throw new Error(err.message);
    }

    throw new Error('Failed to sign out');
  }
}
