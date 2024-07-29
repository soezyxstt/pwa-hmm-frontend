'use client';

import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function HeaderX({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const firstPath = pathname.split('/')[1];
  return (
    <div
      className={cn(
        'md:flex justify-between hidden h-16 border-b items-center',
        className
      )}
      {...props}
    >
      <h1 className='text-xl capitalize'>
        {firstPath === 'mycareer'
          ? 'MyCareer'
          : firstPath.replace('hmm', 'HMM')}
      </h1>
      {children}
    </div>
  );
}
