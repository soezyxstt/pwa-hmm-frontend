'use client';

import { signOut } from '@/actions/user-action';
import { useAction } from 'next-safe-action/hooks';

export default function SignOut() {
  const { execute } = useAction(signOut, {
    onSuccess: (data) => {

    },
    onError: () => {
      throw new Error('Failed to sign out');
    }
  });
  execute({});
}
  