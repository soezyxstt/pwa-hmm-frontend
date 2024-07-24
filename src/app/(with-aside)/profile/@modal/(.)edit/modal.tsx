'use client';

import { useRouter } from 'next/navigation';
import { type MouseEvent, useEffect, useRef } from 'react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  function close(e: MouseEvent<HTMLDialogElement>) {
    e.target === ref.current && router.back();
  }

  return <dialog
    ref={ref}
    onClick={close}
    onClose={router.back}
    className='backdrop:bg-black/40 bg-transparent backdrop:backdrop-blur-sm fixed inset-0 z-50'
  >
    <div className='w-[min(90vw,32rem)]'>
      {children}
    </div>
  </dialog>;
}
