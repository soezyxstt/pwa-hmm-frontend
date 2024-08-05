import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ModalFramer({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className='fixed inset-0 grid place-items-center z-[99] pointer-events-none'>
      <motion.div
        layoutId={id}
        className={cn(
          'w-full max-w-[min(32rem,90vw)] bg-white rounded-lg shadow-lg p-4 overflow-hidden flex flex-col pointer-events-auto',
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
