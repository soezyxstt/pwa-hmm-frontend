'use client';

import { signOut } from '@/_actions/user-action';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { useAction } from 'next-safe-action/hooks';
import { useFormState } from 'react-dom';

export default function SignOut() {
  const [state, action] = useFormState(signOut, { status: 'idle' });
  const router = useRouter();

  useEffect(() => {
    action();
    setTimeout(() => {
      router.push('/');
    }, 2000);
  });

  return (
    <div className='min-h-dvh w-full justify-center items-center flex bg-background text-navy'>
      Signing you out...
    </div>
  );
}
