import type { Metadata } from 'next';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col gap-4 min-h-dvh w-full justify-center items-center bg-background text-navy'>
      <div className='text-center flex flex-col gap-2'>
        <p className='text-2xl md:text-4xl font-medium'>404</p>
        <p className=''>{'Sorry, page could not be found'}</p>
      </div>
      <Link
        href='/'
        className='p-2 text-blue-600 rounded-sm '
      >
        Home
      </Link>
    </div>
  );
}

export const metadata: Metadata = {
  title: "404 | Page Not Found",
}