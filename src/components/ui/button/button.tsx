import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
  variant?: 'base' | 'outline' | 'ghost';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  className,
  children,
  variant = 'base',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'py-2 px-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/50',
        variant === 'base'
          ? 'bg-navy text-white hover:bg-navy/90'
          : variant === 'outline'
          ? 'border border-navy text-navy hover:bg-navy/10'
          : 'text-navy bg-navy/10 hover:bg-navy/20',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
