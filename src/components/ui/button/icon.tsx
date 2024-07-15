import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

export type IconProps = { icon: ReactNode } & HTMLAttributes<HTMLButtonElement>;

const Icon = ({ icon, className, ...props }: IconProps) => {
  return (
    <button
      className={cn('rounded-full p-2 text-white', className)}
      {...props}
    >
      {icon}
    </button>
  );
};

export default Icon;
