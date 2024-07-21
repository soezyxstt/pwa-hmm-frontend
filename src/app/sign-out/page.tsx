import { signOut } from '@/actions/user-action';

export const dynamic = 'force-dynamic';

export default async function SignOut() {
  await signOut({})
  return (
    <div className='min-h-dvh w-full justify-center items-center flex bg-background text-navy'>
      Signing you out...
    </div>
  );
}
  