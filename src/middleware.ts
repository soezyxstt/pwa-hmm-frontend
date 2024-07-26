import { JWTPayload, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { env } from './env';

const key = new TextEncoder().encode(env.AUTH_SECRET);

async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload as JWTPayload & {
      userId: string;
      access_token: string;
      refresh_token: string;
    };
  } catch (err) {
    console.log('Error decrypting session');
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const protectedPaths = ['dashboard', 'profile', 'assignments', 'courses', 'hmm-store', 'myhmm', 'mycareer', 'scholarships']
  const cookie = request.cookies.get('session-hmm')?.value;
  const session = await decrypt(cookie);

  if (protectedPaths.includes(request.nextUrl.pathname.split('/')[1]) && !session?.userId) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (request.nextUrl.pathname === '/sign-out' && !session?.userId) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (request.nextUrl.pathname === '/sign-in' && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
