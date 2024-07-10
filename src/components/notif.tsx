import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

const Notif = ({
  children,
  className,
  top,
  bottom,
  left,
  right,
  ...props
}: {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  } & HTMLAttributes<HTMLDivElement>) => {
  top = top ? `top-${top}` : '';
  bottom = bottom ? `bottom-${bottom}` : '';
  left = left ? `left-${left}` : '';
  right = right ? `right-${right}` : '';
  return (
    <div
      className={cn(
        'bg-oren rounded-full h-4 w-4 flex items-center justify-center top-0 right-0 absolute',
        top,
        bottom,
        left,
        right,
        className
      )}
      {...props}
    >
      <span className='rounded-full text-white text-[.5rem]'>{children}</span>
    </div>
  );
};

export default Notif;
