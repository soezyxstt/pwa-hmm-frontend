import 'server-only';
import { type JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { env } from '@/env';
import { cache } from 'react';
import { NextResponse, type NextRequest } from 'next/server';

const key = new TextEncoder().encode(env.AUTH_SECRET);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7day')
    .sign(key);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload as JWTPayload & {userId: string, access_token: string, refresh_token: string};
  } catch (err) {
    console.log('Error decrypting session');
    return null;
  }
}

export async function createSession(id: string, access_token: string, refresh_token: string) {
  const expires = new Date(Date.now() + env.SESSION_MAX_AGE);
  const session = await encrypt({ userId: id, access_token, refresh_token, expires: expires });

  cookies().set('session', session, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value;

  if (!cookie) {
    return {isAuth: false, userId: '', access_token: '', refresh_token: ''};
  }

  const session = await decrypt(cookie);

  if (!session?.userId) {
    return {isAuth: false, userId: '', access_token: '', refresh_token: ''};
  }

  return {isAuth: true, userId: session.userId, access_token: session.access_token, refresh_token: session.refresh_token};
})

export async function updateSession(request: NextRequest) {
  const session = cookies().get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return;
  }

  const expires = new Date(Date.now() + env.SESSION_MAX_AGE);
  
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt({ ...payload, expires: expires }),
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
  })

  return res;
}

export async function deleteSession() {
  cookies().set('session', '', {
    expires: new Date(0),
  });
}