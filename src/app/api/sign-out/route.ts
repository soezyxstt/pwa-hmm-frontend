import { env } from '@/env';
import { verifySession } from '@/lib/session';
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(request: NextRequest) {
  const session = await verifySession()

  if (!session.isAuth) {
    return Response.json({ error: 'User is not authenticated' }, { status: 401 })
  }

  const res = await fetch(env.API_URL + '/users/signout', {
    headers: {
      method: 'POST',
      'Content-Type': 'application/json',
      Cookie: `accessToken=${session.access_token}; refreshToken=${session.refresh_token}`
    }
  })

  if (!res.ok) {
    return Response.json({ error: 'Failed to sign out' }, { status: 500 })
  }

  console.log(res);

  return Response.json({ message: 'User signed out successfully' })
}
