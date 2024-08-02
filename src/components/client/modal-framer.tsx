import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function ModalFramer({
  id,
  show,
  className,
  children,
}: {
  id: string;
  show: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
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
      )}
    </AnimatePresence>
  );
}
