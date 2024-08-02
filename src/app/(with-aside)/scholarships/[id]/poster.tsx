'use client';

import { cn } from '@/lib/utils';
import Image, { type ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import MotionFramer from '@/components/client/modal-framer';
import { useState } from 'react';
import MotionOverlay from '@/components/client/modal-overlay';

export default function Poster({
  src,
  alt = '',
  mode,
  className,
  ...props
}: { src: string; mode: 'desktop' | 'mobile' } & ImageProps) {
  const [active, setActive] = useState(false);
  return (
    <>
      <motion.div
        layoutId={`poster-${src}-${mode}`}
        onClick={() => setActive(true)}
        className={`cursor-pointer ${
          mode === 'mobile' ? 'md:hidden' : 'hidden md:block'
        }`}
      >
        <Image
          src={src}
          alt={alt}
          width={1000}
          height={1000}
          className={cn(
            ' aspect-[3/4] w-32 rounded-lg object-center',
            className
          )}
          {...props}
        />
      </motion.div>
      <MotionOverlay
        setActive={setActive}
        setTo={false}
        show={active}
      />
      <MotionFramer
        id={`poster-${src}-${mode}`}
        className='p-0 rounded-sm'
        show={active}
      >
        <Image
          src={src}
          alt={alt}
          width={1000}
          height={1000}
          className='w-full h-full'
        />
      </MotionFramer>
    </>
  );
}
