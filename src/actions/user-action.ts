'use server';

import {env} from '@/env';
import {actionClient} from '@/lib/action-client';
import {PWAError} from '@/lib/error';
import {signInSchema, signUpSchema} from '@/lib/schema';
import {createSession, deleteSession, verifySession} from '@/lib/session';
import {getTokenFromResponse} from '@/lib/utils';
import {flattenValidationErrors} from 'next-safe-action';

export const signUp = actionClient
  .metadata({actionName: 'signUp'})
  .schema(signUpSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({parsedInput: {name, email, password}}) => {
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

      if (!res.ok) {
        throw new PWAError('Failed to sign up');
      }

      return {
        message: 'User created successfully',
        status: 'success',
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }

      throw new PWAError('Failed to sign up');
    }
  });

export const signIn = actionClient
  .metadata({actionName: 'signIn'})
  .schema(signInSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({parsedInput: {email, password}}) => {
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

      const {access_token, refresh_token, expire} = getTokenFromResponse(
        res
      );

      const signInRes = await res.json();

      if (signInRes.error) {
        throw new PWAError(signInRes.error.message);
      }

      const data = await fetch(env.API_URL + '/users/me', {
        headers: {
          Cookie: `accessToken=${access_token}; refreshToken=${refresh_token}`,
        },
      });

      const dataRt = await data.json();

      if (!data.ok) {
        throw new PWAError(dataRt.error.message);
      }

      if (!res.ok || !access_token || !refresh_token) {
        throw new PWAError('Failed to retrieve tokens');
      }

      const {id, role} = dataRt;

      void createSession(id, role, access_token, refresh_token, expire ?? '0');
      return {
        message: 'User signed in successfully',
        status: 'success',
        redirect: true,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }

      throw new PWAError('Failed to sign in');
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

    await fetch(env.API_URL + '/users/signout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Cookie: `accessToken=${session.access_token}`,
      },
    });

    void deleteSession();

    return {
      status: 'success',
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new PWAError('Failed to sign out');
  }
}
