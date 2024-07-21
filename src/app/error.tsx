"use client";

import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export default function Error() {
  return (
    <div className='flex gap-4 min-h-dvh w-full justify-center items-center bg-background text-red-600'>
      <p>500</p>
      <Separator
        orientation='vertical'
        className='h-12 bg-red-600'
      />
      <p>Oops... an Error occured</p>
    </div>
  );
}

export const metadata: Metadata = {
  title: '500 | Error',
};
