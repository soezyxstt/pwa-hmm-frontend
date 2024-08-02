import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import type { Dispatch, SetStateAction } from 'react';

export default function MotionOverlay<T, K, M, L>({
  setActive,
  setTo,
  show,
  className,
}: {
  setActive: Dispatch<SetStateAction<T | K | M | L>>;
  setTo: K | M | L;
  show: boolean;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-full z-10',
            className
          )}
          onClick={() => setActive(setTo)}
        />
      )}
    </AnimatePresence>
  );
}
