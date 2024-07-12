import type { HTMLAttributes } from 'react';
import ProfileMenu from './profileMenu';
import { cn } from '@/lib/utils';

export default function Header({ title, className, ...props }: { title: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('md:flex justify-between hidden', className)} {...props}>
      <h1>{title}</h1>
      <ProfileMenu />
    </div>
  );
}
