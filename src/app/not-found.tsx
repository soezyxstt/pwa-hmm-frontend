import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';

export default function NotFound() {
  return (
    <div className='flex gap-4 min-h-dvh w-full justify-center items-center bg-background text-navy'>
      <p>404</p>
      <Separator orientation='vertical' className='h-12 bg-navy' />
      <p>Page could not be found</p>
    </div>
  );
}

export const metadata: Metadata = {
  title: "404 | Page Not Found",
}