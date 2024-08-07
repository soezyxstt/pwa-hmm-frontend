'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {ReactNode} from "react";

export default function MainTransition({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode='wait'>
      <motion.main
        className='flex flex-col flex-1 h-max px-4 pt-4 pb-6 md:px-6 md:pt-0 lg:px-10 gap-4 md:gap-6'
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        exit={{ y: 20, opacity: 0 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
